import React, {Component} from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';

class Album extends Component {
	constructor(props) {
	super(props);
	const album = albumData.find( album => {
		return album.slug === this.props.match.params.slug
	});
	this.state ={
		album: album,
		currentSong: album.songs[0],
		isPlaying: false,
		hover: false,
		currentTime: 0,
		duration: album.songs[0].duration,
		currentVolume: 0.1
		};
	this.audioElement = document.createElement('audio');
	this.audioElement.src = album.songs[0].audioSrc;
}
	componentDidMount() {
		this.eventListeners = {
			timeupdate: e => {
				this.setState({ currentTime: this.audioElement.currentTime});
},
			durationchange: e => {
				this.setState({ duration: this.audioElement.duration});
},			volumechange: e => {
				this.setState({currentVolume: this.audioElement.currentVolume});
}
};
			this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
			this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange); 
			this.audioElement.addEventListener('volumechange', this.eventListeners.volumechange);
}
	componentWillUnmount() {
		this.audioElement.src = null;
		this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
		this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
		this.audioElement.removeEventListener('volumechange', this.eventListeners.volumechange);
}
play() {
		this.audioElement.play();
		this.setState({isPlaying: true});
}
	pause() {
		this.audioElement.pause();
		this.setState({isPlaying: false});
}
	setSong(song) {
		this.audioElement.src = song.audioSrc;
		this.setState({ currentSong: song});
}
	hoverOn(song) {
		this.setState({hover: song});
}
	hoverOff(song) {
		this.setState({hover: null});
}
	showIcon(song, i) {
		const isSameSong= this.state.currentSong === song;
		if((this.state.hover===song && !isSameSong) ||(this.state.hover===song && isSameSong && !this.state.isPlaying 
|| !this.state.isPlaying && isSameSong ))
		{ return <span className='icon ion-md-play'></span>
		} else if ((this.state.hover===song && this.state.isPlaying && isSameSong || this.state.isPlaying && isSameSong))
		{ return <span className = 'icon ion-md-pause'></span>
		}
		else  {
		return i + 1;
}
}
	handlePrevClick() {
		const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
		const newIndex = Math.max(0, currentIndex - 1);
		const newSong = this.state.album.songs[newIndex];
		this.setSong(newSong);
		this.play();
}
	handleNextClick() {
		const currentIndex=this.state.album.songs.findIndex(song => this.state.currentSong===song);
		const newIndex = Math.min(currentIndex+1 , this.state.album.songs.length-1);
		const newSong = this.state.album.songs[newIndex];
		this.setSong(newSong);
		this.play();
}
	handleSongClick(song) {
		const isSameSong = this.state.currentSong === song;
		if (this.state.isPlaying && isSameSong) {
			this.pause();
		} else {
			if (!isSameSong) {this.setSong(song);}
			this.play();
		}
	}
	handleTimeChange(e) {
		const newTime = this.audioElement.duration * e.target.value;
		this.audioElement.currentTime = newTime;
		this.setState({currentTime: newTime});
}
	handleVolumeChange(e) {
		var newVolume = this.audioElement.volume=e.target.value;
		this.audioElement.currentVolume= newVolume;
		this.setState({currentVolume: newVolume});
}
	formatTime(seconds) {
		var min = parseInt(seconds/60) || "-" ;
		var secs = parseInt(seconds % 60) || "--";
		if (secs >=0 && secs < 10) {
			secs = "0" +  secs;
		}
		if (secs >=0 && secs<60 ) {
			min = "0"
		}
			return min + ":" + secs;
}
	render() {
	return (
	<section className="album">
		<section id="album-info">
			<img id="album-cover-art"
src={this.state.album.albumCover} alt={this.state.album.title} />
			<div className="album-details">
				<h1 id="album-title">{this.state.album.title}</h1>
				<h2 className="artist">{this.state.album.artist}</h2>
				<div id ="release-info">{this.state.album.releaseInfo}</div>
			</div>
		</section>
		<table id="song-list"style={{margin: "auto"}}>
			<colgroup>
				<col id="song-number-column" />
				<col id="song-title-column" />
				<col id="song-duration-column" />
			</colgroup>

			<tbody>
				{
				this.state.album.songs.map((song, index) => 
				<tr className="song" key ={index} 
onClick={ () => this.handleSongClick(song)} 
onMouseEnter={ () => this.hoverOn(song)} 
onMouseLeave={ () => this.hoverOff()} 
>
					<td className="song-options"> 
						<button>
						{this.showIcon(song, 
index)}
						</button>
					</td>
	 				<td >{song.title}
					</td>
					<td className =
"song-duration">{this.formatTime(parseFloat(song.duration))}
					</td>
				</tr>
			)}
			 </tbody>
		</table>
	<PlayerBar
		isPlaying={this.state.isPlaying}
		currentSong={this.state.currentSong} 
		handleSongClick={() =>this.handleSongClick(this.state.currentSong)}
		handlePrevClick={() => this.handlePrevClick()}
		handleNextClick={() => this.handleNextClick()}
		currentTime={this.audioElement.currentTime}
		duration={this.audioElement.duration}
		handleTimeChange={(e) => this.handleTimeChange(e)}
		currentVolume={this.audioElement.currentVolume}
		handleVolumeChange={(e) => this.handleVolumeChange(e)}
		formatTime= {(seconds) => this.formatTime(seconds)}
		/>
	</section>
	);
}
}
export default Album;

