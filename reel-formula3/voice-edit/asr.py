import sherpa_onnx, soundfile as sf, sys
d='sherpa-onnx-whisper-small/'
rec=sherpa_onnx.OfflineRecognizer.from_whisper(encoder=d+'small-encoder.int8.onnx',decoder=d+'small-decoder.int8.onnx',tokens=d+'small-tokens.txt',language='ms',task='transcribe',num_threads=4)
def run(wav,chunks):
    a,sr=sf.read(wav,dtype='float32')
    for s,e in chunks:
        st=rec.create_stream(); st.accept_waveform(sr,a[int(s*sr):int(e*sr)]); rec.decode_stream(st)
        print(f'[{s:5.2f}-{e:5.2f}] {st.result.text}',flush=True)
print('== VO')
run('vo.wav',[(0,5.45),(5.85,12.95),(13.2,25.2),(25.45,34.6),(34.85,38.1),(39.25,42.6)])
print('== CLIP')
run('clip.wav',[(0,5.46)])
