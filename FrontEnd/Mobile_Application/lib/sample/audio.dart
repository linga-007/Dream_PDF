import 'package:flutter/material.dart';
import 'package:just_audio/just_audio.dart';

class AudioPlayerScreen extends StatefulWidget {
  @override
  _AudioPlayerScreenState createState() => _AudioPlayerScreenState();
}

class _AudioPlayerScreenState extends State<AudioPlayerScreen> {
  final AudioPlayer _audioPlayer = AudioPlayer();
  bool _isPlaying = false;
  double _volume = 1.0;
  double _speed = 1.5;
  final String url = "http://localhost:8000/file/ashif.mp3";

  @override
  void initState() {
    super.initState();
    _audioPlayer.setUrl(url);
    _audioPlayer.playerStateStream.listen((state) {
      setState(() {
        _isPlaying = state.playing;
      });
    });
  }

  void _playPause() {
    if (_isPlaying) {
      _audioPlayer.pause();
    } else {
      _audioPlayer.play();
    }
  }

  void _setVolume(double volume) {
    setState(() {
      _volume = volume;
      _audioPlayer.setVolume(volume);
    });
  }

  void _setSpeed(double speed) {
    setState(() {
      _speed = speed;
      _audioPlayer.setSpeed(speed);
    });
  }

  @override
  void dispose() {
    _audioPlayer.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Audio Player'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            IconButton(
              icon: Icon(
                _isPlaying ? Icons.pause : Icons.play_arrow,
              ),
              onPressed: _playPause,
            ),
            Column(
              children: [
                Text('Volume'),
                Slider(
                  value: _volume,
                  onChanged: _setVolume,
                  min: 0.0,
                  max: 1.0,
                ),
                Text('Speed'),
                Slider(
                  value: _speed,
                  onChanged: _setSpeed,
                  min: 0.5,
                  max: 2.0,
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
