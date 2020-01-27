import React from "react";
import ReactDOM from "react-dom";

import { GoogleMap, Marker, InfoWindow, withGoogleMap, withScriptjs } from "react-google-maps";
const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");

var helpersObjects = SystemKit.Helpers;

const InitializedGoogleMap = withScriptjs(withGoogleMap(props => {
	return (
		<GoogleMap
			{...props}
		>
			{props.children}
		</GoogleMap>
	)
}));

class InitializedGoogleMapMarker extends React.Component {
	constructor(props) {
		super(props);

		let thisRef = this;

		thisRef.state = {
			showInfo: false
		};
	}

	render() {
		let thisRef = this;

		return (
			<Marker
				onClick={thisRef.onMarkerClick.bind(thisRef)}
				position={{
					lat: thisRef.props.device.Latitude,
					lng: thisRef.props.device.Longitude
				}}
				{...thisRef.props}
			>
				{thisRef.state.showInfo &&
					<InfoWindow onCloseClick={thisRef.onInfoClosed.bind(thisRef)}>
						<div>
							<h1>{thisRef.props.device.Name}</h1>
							<h5>{thisRef.props.device.Id}</h5>
						</div>
					</InfoWindow>
				}
			</Marker>
		)
	}

	onMarkerClick() {
		let thisRef = this;

		thisRef.setState({
			...thisRef.state,
			showInfo: true
		});
	}

	onInfoClosed() {
		let thisRef = this;

		thisRef.setState({
			...thisRef.state,
			showInfo: false
		});
	}
}

class ConnectMoonGoogleMap extends React.Component {
	constructor(props) {
		super(props);

		let thisRef = this;

		thisRef.state = {};
	}

	render() {
		let thisRef = this;

		var devices = [];
		if (!helpersObjects.IsNullOrEmpty(thisRef.props.devices)) {
			for (var i = 0; i < thisRef.props.devices.length; i++) { // ConnectMoon.Models.Device[]
				devices.push(
					<InitializedGoogleMapMarker
						key={i} // REACT NEEDS THIS
						device={thisRef.props.devices[i]}
					/>
				);
			}
		}

		var googleMapURL =
			"https://maps.googleapis.com/maps/api/js?key="
			+ thisRef.props.apiKey
			+ "&v=3.exp&libraries=geometry,drawing,places";

		return (<InitializedGoogleMap
			googleMapURL={googleMapURL}
			defaultZoom={thisRef.props.defaultZoom}
			defaultCenter={thisRef.props.defaultCenter}
			loadingElement={<div style={{ height: `100%` }} />}
			containerElement={<div style={{ height: "100%", width: "100%" }} />}
			mapElement={<div style={{ height: `100%` }} />}>

			<MarkerClusterer
				onClick={thisRef.onMarkerClustererClick.bind(thisRef)}
				averageCenter
				enableRetinaIcons
				gridSize={60}
			>
				{devices}
			</MarkerClusterer>

		</InitializedGoogleMap>)
	}

	onMarkerClustererClick(markerClusterer) {
		// const clickedMarkers = markerClusterer.getMarkers();

		// console.log(`Current clicked markers length: ${clickedMarkers.length}`)
		// console.log(clickedMarkers)
	}
}

export default ConnectMoonGoogleMap;