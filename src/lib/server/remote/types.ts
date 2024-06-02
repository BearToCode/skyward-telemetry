export enum ValveState {
	Open = 1,
	Closed = 0
}

export enum TARSState {
	Disabled = 0,
	Enabled = 1
}

export enum BoardStatus {
	NotPresent = 0,
	Online = 1,
	Armed = 2
}

export enum PinState {
	Disconnect = 0,
	Connected = 1
}

export enum CutterPresence {
	NotPresent = 0,
	Present = 1
}

export enum ButtonState {
	Released = 0,
	Pressed = 1
}

export type MotorTelemetry = {
	type: 'MOTOR_TM'
	timestamp: number
	top_tank_pressure: number
	bottom_tank_pressure: number
	combustion_chamber_pressure: number
	tank_temperature: number
	battery_voltage: number
	current_consumption: number
	main_valve_state: ValveState
	venting_valve_state: ValveState
}

export type GSETelemetry = {
	type: 'GSE_TM'
	timestamp: number
	loadcell_rocket: number
	loadcell_vessel: number
	filling_pressure: number
	vessel_pressure: number
	battery_voltage: number
	current_consumption: number
	arming_state: number
	filling_valve_state: ValveState
	venting_valve_state: ValveState
	release_valve_state: ValveState
	main_valve_state: ValveState
	nitrogen_valve_state: ValveState
	gmm_state: number
	tars_state: TARSState
	main_board_status: BoardStatus
	payload_board_status: BoardStatus
	motor_board_status: BoardStatus
}

export type RocketStatsTelemetry = {
	type: 'ROCKET_STATS_TM'
	liftoff_ts: number
	liftoff_max_acc_ts: number
	liftoff_max_acc: number
	dpl_ts: number
	dpl_max_acc: number
	max_z_speed_ts: number
	max_z_speed: number
	max_airspeed_pitot: number
	max_speed_altitude: number
	apogee_ts: number
	apogee_lat: number
	apogee_lon: number
	apogee_alt: number
	min_pressure: number
	ada_min_pressure: number
	dpl_vane_max_pressure: number
	cpu_load: number
	free_heap: number
}

export type PayloadStatsTelemetry = {
	type: 'PAYLOAD_STATS_TM'
	liftoff_max_acc_ts: number
	liftoff_max_acc: number
	dpl_ts: number
	dpl_max_acc: number
	max_z_speed_ts: number
	max_z_speed: number
	max_airspeed_pitot: number
	max_speed_altitude: number
	apogee_ts: number
	apogee_lat: number
	apogee_lon: number
	apogee_alt: number
	min_pressure: number
	cpu_load: number
	free_heap: number
}

export type RocketFlightTelemetry = {
	type: 'ROCKET_FLIGHT_TM'
	timestamp: number
	ada_state: number
	fmm_state: number
	dp_state: number
	abk_state: number
	nas_state: number
	mea_state: number
	pressure_ada: number
	pressure_digi: number
	pressure_dpl: number
	airspeed_pitot: number
	altitude_agl: number
	ada_vert_speed: number
	mea_mass: number
	acc_x: number
	acc_y: number
	acc_z: number
	gyro_x: number
	gyro_y: number
	gyro_z: number
	mag_x: number
	mag_y: number
	mag_z: number
	gps_fix: number
	gps_lat: number
	gps_lon: number
	gps_alt: number
	abk_angle: number
	nas_n: number
	nas_e: number
	nas_d: number
	nas_vn: number
	nas_ve: number
	nas_vd: number
	nas_qx: number
	nas_qy: number
	nas_qz: number
	nas_qw: number
	nas_bias_x: number
	nas_bias_y: number
	nas_bias_z: number
	pin_quick_connector: PinState
	pin_launch: PinState
	pin_nosecone: PinState
	pin_expulsion: PinState
	cutter_presence: CutterPresence
	battery_voltage: number
	cam_battery_voltage: number
	current_consumption: number
	temperature: number
	logger_error: number
}

export type PayloadFlightTelemetry = {
	type: 'PAYLOAD_FLIGHT_TM'
	timestamp: number
	fmm_state: number
	wes_state: number
	pressure_digi: number
	pressure_static: number
	airspeed_pitot: number
	altitude_agl: number
	acc_x: number
	acc_y: number
	acc_z: number
	gyro_x: number
	gyro_y: number
	gyro_z: number
	mag_x: number
	mag_y: number
	mag_z: number
	gps_fix: number
	gps_lat: number
	gps_lon: number
	gps_alt: number
	left_servo_angle: number
	right_servo_angle: number
	nas_n: number
	nas_e: number
	nas_d: number
	nas_vn: number
	nas_ve: number
	nas_vd: number
	nas_qx: number
	nas_qy: number
	nas_qz: number
	nas_qw: number
	nax_bias_x: number
	nax_bias_y: number
	nax_bias_z: number
	wes_n: number
	wes_e: number
	pin_nosecone: PinState
	battery_voltage: number
	cam_battery_voltage: number
	current_consumption: number
	cutter_presence: CutterPresence
	temperature: number
	logger_error: number
}

export type ConrigStateTelemetry = {
	type: 'CONRIG_STATE_TC'
	ignition_btn: ButtonState
	filling_valve_btn: ButtonState
	venting_valve_btn: ButtonState
	release_pressure_btn: ButtonState
	quick_connector_btn: ButtonState
	start_tars_btn: ButtonState
	arm_switch: ButtonState
}

export type RemoteData = {
	MOTOR_TM: MotorTelemetry[]
	GSE_TM: GSETelemetry[]
	ROCKET_STATS_TM: RocketStatsTelemetry[]
	PAYLOAD_STATS_TM: PayloadStatsTelemetry[]
	ROCKET_FLIGHT_TM: RocketFlightTelemetry[]
	PAYLOAD_FLIGHT_TM: PayloadFlightTelemetry[]
	CONRIG_STATE_TC: ConrigStateTelemetry[]
}

export type Telemetry =
	| MotorTelemetry
	| GSETelemetry
	| RocketStatsTelemetry
	| PayloadStatsTelemetry
	| RocketFlightTelemetry
	| PayloadFlightTelemetry
	| ConrigStateTelemetry

export type TelemetryType = Telemetry['type']
