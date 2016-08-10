import _ from 'lodash';
import React, { Component } from 'React';
import ReactDOM from 'React-Dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = "AIzaSyDx0xWV9RlB54rVlA5DDaau3N4BIxNUBlU";

class App extends Component {
	constructor(props){
		super(props)

		this.state = {
			videos: [],
			selectedVideo: null
			};
		this.videoSearch('basketball');
	}

	videoSearch(term) {
		YTSearch({key: API_KEY, term: term}, (videos) => {
			this.setState({ 
				videos: videos,
				selectedVideo: videos[0]
				 });
		});
	}

	render() {
		const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300)
		return  (
			<div>
				<SearchBar onSearchTermChange={videoSearch}/>
				<VideoDetail video= {this.state.selectedVideo}/>
				<VideoList
					onVideoSelect={selectedVideo => this.setState({selectedVideo}) } 
					videos = {this.state.videos}/>
			</div>
		);
	}
}

ReactDOM.render(<App />, document.querySelector('.container'));