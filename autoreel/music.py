"""Generate an original, royalty-free background bed (soft lo-fi pad + pluck + light beat).

Everything is synthesised here, so there is no third-party copyright in the output.
Usage from code: make_bed(seconds, path_wav, seed)
"""
import wave

import numpy as np

SR = 44100
BPM = 84

# Warm, calm progression (Cmaj7 - Am7 - Fmaj7 - G6), MIDI note numbers.
PROGRESSIONS = [
    [[48, 55, 59, 64], [45, 52, 55, 60], [41, 48, 52, 57], [43, 50, 52, 59]],
    [[50, 57, 60, 65], [46, 53, 57, 62], [43, 50, 53, 58], [45, 52, 55, 61]],
    [[45, 52, 55, 60], [41, 48, 52, 57], [48, 55, 59, 64], [43, 50, 55, 59]],
]


def hz(n):
    return 440.0 * 2 ** ((n - 69) / 12)


def env(n, attack, release):
    e = np.ones(n)
    a, r = int(attack * SR), int(release * SR)
    e[:a] = np.linspace(0, 1, a)
    e[-r:] *= np.linspace(1, 0, r)
    return e


def pad(freqs, dur):
    t = np.arange(int(dur * SR)) / SR
    out = np.zeros_like(t)
    for f in freqs:
        for detune in (-0.12, 0.12):
            ff = f * 2 ** (detune / 12)
            out += np.sin(2 * np.pi * ff * t) + 0.25 * np.sin(4 * np.pi * ff * t)
    return out / (len(freqs) * 2) * env(len(t), 0.6, 0.8)


def pluck(f, dur=0.5):
    t = np.arange(int(dur * SR)) / SR
    return (np.sin(2 * np.pi * f * t) + 0.3 * np.sin(6 * np.pi * f * t)) * np.exp(-t * 7)


def kick(dur=0.35):
    t = np.arange(int(dur * SR)) / SR
    return np.sin(2 * np.pi * (50 + 60 * np.exp(-t * 30)) * t) * np.exp(-t * 12)


def hat(rng, dur=0.06):
    n = int(dur * SR)
    return rng.standard_normal(n) * np.exp(-np.arange(n) / SR * 80) * 0.25


def make_bed(seconds, path, seed=0):
    rng = np.random.default_rng(seed)
    prog = PROGRESSIONS[seed % len(PROGRESSIONS)]
    beat = 60 / BPM
    bar = beat * 4
    total = int((seconds + 1) * SR)
    mix = np.zeros(total)

    def add(sig, start, gain):
        s = int(start * SR)
        e = min(total, s + len(sig))
        if s < total:
            mix[s:e] += sig[: e - s] * gain

    n_bars = int(seconds / bar) + 2
    for b in range(n_bars):
        chord = prog[b % len(prog)]
        add(pad([hz(n) for n in chord], bar + 0.8), b * bar, 0.35)
        for k in range(8):  # eighth-note arpeggio, one octave up
            add(pluck(hz(chord[k % 4] + 12)), b * bar + k * beat / 2, 0.12)
        for k in range(4):
            if k in (0, 2):
                add(kick(), b * bar + k * beat, 0.45)
            add(hat(rng), b * bar + k * beat + beat / 2, 0.5)

    mix = mix[: int(seconds * SR)]
    mix *= env(len(mix), 1.0, 1.5)
    mix = np.tanh(mix * 1.2)
    mix = mix / (np.max(np.abs(mix)) + 1e-9) * 0.2  # background level, leaves room for voice/trending audio
    stereo = np.stack([mix, np.roll(mix, 220)], axis=1)
    with wave.open(path, "wb") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes((stereo * 32767).astype(np.int16).tobytes())
