import React, {Component} from 'react'; 
import albumData from './../data/albums';
import {Link} from 'react-router-dom';
import LibraryStyles from './Library.css';
class Library extends Component {
	constructor(props) {
		super(props);
		this.state={ albums: albumData };
	}
	render () {
		return (
			<section className='library'>
			{this.state.albums.map((album, index) =>
			<Link to={`/album/${album.slug}`} className="row" key={index}>
			<img className="albumImage" src={album.albumCover} 
alt={album.title} />
			<div className='albumInfo'>
			<div className='albumTitle'>{album.title}</div>
			<div className='albumArtist'>{album.artist}</div>
			<div className = 'albumSongs'>{album.songs.length} songs</div>
			</div>
			</Link>	) }
			</section>
		);
	}
}
export default Library;


