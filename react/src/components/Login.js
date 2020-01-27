import React from "react";
import ReactDOM from "react-dom";

import { withStyles } from '@material-ui/core/styles';
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

import { slideInLeft, slideInRight } from 'react-animations'
import { slideOutLeft, slideOutRight } from 'react-animations'
import { rotateIn, rotateOut } from 'react-animations'

import styled, { keyframes } from 'styled-components';

var helpersObjects = SystemKit.Helpers;
var helpersTasks = SystemKit.Helpers;
var connectMoonSdk = ConnectMoon;

// All override magic from here
// https://github.com/mui-org/material-ui/blob/6f0552989e9aa7663e32fc1ecd1eaaff180aa8cf/src/Input/Input.js#L129
const Left_MUI_TextField = withStyles({
	root: {
		"& .MuiInput-underline:before": {
			borderBottomColor: "white"
		},
		// "& .MuiInput-underline:after": {
		// 	borderBottomColor: "red"
		// },
		// "& .MuiInput-underline:hover:not($disabled):before": {
		// 	borderBottomColor: "yellow"
		// },
	}
})(MUI_TextField);

class Login extends React.Component {
	constructor(props) {
		super(props);

		let thisRef = this;

		thisRef.animationTime = 3;

		thisRef.state = {
			loginButton_EnableAnimation: false,
			loginButton_Show: true,

			unlockDashboard_EnableAnimation: false
		};
	}

	render() {
		let thisRef = this;

		const moveLeftAnimation = keyframes`${slideOutLeft}`;
		var LeftDiv = styled.div``;
		if (thisRef.state.unlockDashboard_EnableAnimation) {
			LeftDiv = styled.div`
				animation: ${thisRef.animationTime}s ${moveLeftAnimation};
			`;
		}

		const moveRightAnimation = keyframes`${slideOutRight}`;
		var RightDiv = styled.div``;
		if (thisRef.state.unlockDashboard_EnableAnimation) {
			RightDiv = styled.div`
				animation: ${thisRef.animationTime}s ${moveRightAnimation};
			`;
		}

		const unlockAnimation = keyframes`${rotateOut}`;
		var LoginDiv = styled.div``;
		if (thisRef.state.loginButton_EnableAnimation) {
			LoginDiv = styled.div`
				animation: ${thisRef.animationTime}s ${unlockAnimation};
			`;
		}

		return (
			<MUI_Grid container spacing={0}
				style={{
					position: "absolute", top: 0, left: 0, bottom: 0, right: 0
				}}>
				<MUI_Grid item xs={6}>
					<LeftDiv style={{ width: "100%", height: "100%", color: "white" }}>
						<MUI_Box
							display="flex"
							width="100%" height="100%"
							bgcolor="#000000"
							alignItems="center"
							justifyContent="center">

							<div style={{ marginLeft: "auto", marginRight: 0 }}>
								<Left_MUI_TextField
									placeholder="user"
									inputProps={{
										style: {
											color: "white",
											textAlign: "center"
										}
									}}
								/>
								{/* <br /><br /><br />
								<img src="images/moon-1.png" style={{ height: "100px", float: "right" }} /> */}
							</div>
						</MUI_Box>
					</LeftDiv>
				</MUI_Grid>
				<MUI_Grid item xs={6}>
					<RightDiv style={{ width: "100%", height: "100%", color: "white" }}>
						<MUI_Box
							display="flex"
							width="100%" height="100%"
							bgcolor="#eeeeee"
							alignItems="center"
							justifyContent="center">

							<div style={{ marginLeft: 0, marginRight: "auto" }}>
								<MUI_TextField
									type="password"
									placeholder="pass"
									inputProps={{
										style: {
											color: "black",
											textAlign: "center"
										}
									}}
								/>
								{/* <br /><br /><br />
								<img src="images/moon-2.png" style={{ height: "100px", float: "left" }} /> */}
							</div>
						</MUI_Box>
					</RightDiv>
				</MUI_Grid>
				{thisRef.state.loginButton_Show ?
					<MUI_Grid item xs={12} style={{ position: "absolute", top: "30%", left: 0, bottom: 0, right: 0, textAlign: "center" }}>
						<MUI_Box
							display="flex"
							width="100%" height="100%"
							bgcolor="transparent"
							alignItems="center"
							justifyContent="center">

							<MUI_IconButton onClick={thisRef.handleClick_LoginButton.bind(thisRef)}>
								<LoginDiv>
									<img src="images/fullmoon.png" style={{ height: "100px" }} />
								</LoginDiv>
							</MUI_IconButton>
						</MUI_Box>
					</MUI_Grid>
					: <span />}
			</MUI_Grid>
		)
	}

	handleClick_LoginButton() {
		let thisRef = this;

		thisRef.setState({
			...thisRef.state,
			loginButton_EnableAnimation: true
		});

		helpersTasks.Run()
			.This((done) => {
				connectMoonSdk.NewClient(
					done,
					"xxxxxxxxxxxxxxxxx",
					"xxxxxxxxxxxxxxxxx",
					"xxxxxxxxxxxxxxxxx",
				);
			})
			.Then((done, client) => {
				thisRef.setState({
					...thisRef.state,
					loginButton_Show: false,
					unlockDashboard_EnableAnimation: true
				});

				thisRef.props.onLogin(client);

				done();
			})
			.OnError((err) => {
				console.log(err)
			});
	}
}

export default Login;