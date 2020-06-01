import React, { lazy, Suspense } from "react";
import "./App.css";
import { Route, BrowserRouter } from "react-router-dom";
const DashboardPage = lazy(() => import("./pages/dashboard"));
const AddMeetingPage = lazy(() => import("./pages/addMeeting"));
const SelectRoomPage = lazy(() => import("./pages/selectRoom"));

function App() {
	return (
		<BrowserRouter>
			<Suspense fallback={<div>Loading ...</div>}>
				<Route path="/" exact component={DashboardPage} />
				<Route path="/add-meeting" exact component={AddMeetingPage} />
				<Route path="/select-room" exact component={SelectRoomPage} />
			</Suspense>
		</BrowserRouter>
	);
}

export default App;
