import React from "react";
import ReactDOM from "react-dom";

import { default as MUI_Box } from "@material-ui/core/Box";
import { default as MUI_Tab } from "@material-ui/core/Tab";
import { default as MUI_Tabs } from "@material-ui/core/Tabs";
import { default as MUI_Menu } from "@material-ui/core/Menu";
import { default as MUI_MenuItem } from "@material-ui/core/MenuItem";
import { default as MUI_AppBar } from "@material-ui/core/AppBar";
import { default as MUI_Collapse } from "@material-ui/core/Collapse";
import { default as MUI_Snackbar } from "@material-ui/core/Snackbar";
import { default as MUI_SnackbarContent } from "@material-ui/core/SnackbarContent";
import { default as MUI_Paper } from "@material-ui/core/Paper";
import { default as MUI_Grid } from "@material-ui/core/Grid";
import { default as MUI_ButtonGroup } from "@material-ui/core/ButtonGroup";
import { default as MUI_ButtonBase } from "@material-ui/core/ButtonBase";
import { default as MUI_Button } from "@material-ui/core/Button";
import { default as MUI_IconButton } from "@material-ui/core/IconButton";
import { default as MUI_Fab } from "@material-ui/core/Fab";
import { default as MUI_Dialog } from "@material-ui/core/Dialog";
import { default as MUI_DialogTitle } from "@material-ui/core/DialogTitle";
import { default as MUI_DialogContent } from "@material-ui/core/DialogContent";
import { default as MUI_TextField } from "@material-ui/core/TextField";
import { default as MUI_DialogActions } from "@material-ui/core/DialogActions";
import { default as MUI_Typography } from "@material-ui/core/Typography";
import { default as MUI_Tooltip } from "@material-ui/core/Tooltip";

// import BackendServices from "./BackendServices"
// import Workspace from "./Workspace"
// import Workspace from "./Workspace"

import Login from "./Login"
import ConnectMoonGoogleMap from "./ConnectMoon-React-GoogleMap"

var helpersObjects = SystemKit.Helpers;
var helpersTasks = SystemKit.Helpers;
var helpersNumbers = SystemKit.Helpers;
var connectMoonSdk = ConnectMoon;

class App extends React.Component {
	constructor(props) {
		super(props);

		let thisRef = this;

		thisRef.connectMoonClient = null;

		thisRef.state = {
			showLogin: true,
			devices: [] // ConnectMoon.Models.Device[]
		};
	}

	render() {
		let thisRef = this;

		return (<div>

			{thisRef.state.showLogin
				? <Login onLogin={thisRef.handleEvent_OnLogin.bind(thisRef)} />
				: <div style={{
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
					bottom: 0
				}}>
					<ConnectMoonGoogleMap
						apiKey="AIzaSyCLHf8GcXUjvkfDPaZNOdiz-NOgIASIUwQ"
						devices={thisRef.state.devices}
						defaultZoom={15.0}
						defaultCenter={{ lat: 37.7927731, lng: -122.4054696 }}
					/>
				</div>
			}

		</div >)
	}

	handleEvent_OnLogin(client) {
		let thisRef = this;

		thisRef.connectMoonClient = client; // type `ConnectMoon.Client`

		helpersTasks.Run()
			.This((done) => {
				thisRef.connectMoonClient.GetDevices(done);
			})
			.Then((done, devices) => { // type `ConnectMoon.Models.Device[]`
				// lat: 37.7927731, lng: -122.4054696

				// Scenario - A
				//
				for (var i = 0; i < devices.length; i++) {
					devices[i].Latitude = helpersNumbers.RandomFloat(37, 37);
					devices[i].Longitude = helpersNumbers.RandomFloat(-122, -122);
				}

				// Scenario-B
				//
				// var lat = 37.7927731;
				// var lng = -122.4054696;
				// for (var i = 0; i < devices.length; i++) {
				// 	devices[i].Latitude = lat;
				// 	devices[i].Longitude = lng;

				// 	lat += 0.0010000;
				// 	lng += 0.0010000;
				// }

				thisRef.setState({
					...thisRef.state,
					showLogin: false,
					devices: devices
				});

				done();
			})
			.OnError((err) => {
				console.log(err)
			});
	}
}

export default App;