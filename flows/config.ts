import {ValueType} from "../types/value-type";

export type ConfigClasses = {
    [key: string]: ConfigCapability[]
}

export type ConfigCapability = {
    value: any
    type: ValueType
    getable: boolean
    setable: boolean
    title: string
    desc?: string | null
    units: string | null
    decimals?: number
    min?: number
    max?: number
    chartType?: string
    id: string
    options: object
    lastUpdated?: null
    values?: {id: string, title: string}[]
    step?: number
}

export default class Config {
    classes: ConfigClasses = {
        "socket": [
            {
                "value": null,
                "lastUpdated": null,
                "type": "boolean",
                "getable": true,
                "setable": true,
                "title": "Turned on",
                "desc": null,
                "units": null,
                "id": "onoff",
                "options": {}
            },
            {
                "value": null,
                "type": "number",
                "getable": true,
                "setable": true,
                "title": "Dim level",
                "desc": null,
                "units": "%",
                "decimals": 2,
                "min": 0,
                "max": 1,
                "chartType": "stepLine",
                "id": "dim",
                "options": {}
            },
            {
                "value": null,
                "type": "number",
                "getable": true,
                "setable": false,
                "title": "Power",
                "desc": "Power in watt (W)",
                "units": "W",
                "decimals": 2,
                "chartType": "stepLine",
                "id": "measure_power",
                "options": {}
            }
        ],
        "light": [
            {
                "value": null,
                "lastUpdated": null,
                "type": "boolean",
                "getable": true,
                "setable": true,
                "title": "Turned on",
                "desc": null,
                "units": null,
                "id": "onoff",
                "options": {}
            },
            {
                "value": null,
                "type": "number",
                "getable": true,
                "setable": true,
                "title": "Dim level",
                "desc": null,
                "units": "%",
                "decimals": 2,
                "min": 0,
                "max": 1,
                "chartType": "stepLine",
                "id": "dim",
                "options": {}
            },
            {
                "value": null,
                "type": "number",
                "getable": true,
                "setable": true,
                "title": "Hue",
                "desc": null,
                "units": null,
                "decimals": 2,
                "min": 0,
                "max": 1,
                "chartType": "stepLine",
                "id": "light_hue",
                "options": {}
            },
            {
                "value": null,
                "type": "number",
                "getable": true,
                "setable": true,
                "title": "Color saturation",
                "desc": null,
                "units": null,
                "decimals": 2,
                "min": 0,
                "max": 1,
                "chartType": "stepLine",
                "id": "light_saturation",
                "options": {}
            },
            {
                "value": null,
                "type": "number",
                "getable": true,
                "setable": true,
                "title": "Color temperature",
                "desc": null,
                "units": null,
                "decimals": 2,
                "min": 0,
                "max": 1,
                "chartType": "stepLine",
                "id": "light_temperature",
                "options": {}
            },
            {
                "value": null,
                "type": "enum",
                "getable": true,
                "setable": true,
                "title": "Light mode",
                "desc": "Switch between color or temperature mode",
                "units": null,
                "values": [
                    {
                        "id": "color",
                        "title": "Color"
                    },
                    {
                        "id": "temperature",
                        "title": "Temperature"
                    }
                ],
                "id": "light_mode",
                "options": {}
            },
            {
                "value": null,
                "type": "number",
                "getable": true,
                "setable": false,
                "title": "Power",
                "desc": "Power in watt (W)",
                "units": "W",
                "decimals": 2,
                "chartType": "stepLine",
                "id": "measure_power",
                "options": {}
            }
        ],
        "tv": [
            {
                "value": null,
                "lastUpdated": null,
                "type": "boolean",
                "getable": true,
                "setable": true,
                "title": "Turned on",
                "desc": null,
                "units": null,
                "id": "onoff",
                "options": {}
            },
            {
                "value": null,
                "type": "number",
                "getable": true,
                "setable": true,
                "title": "Set volume",
                "desc": "Volume",
                "units": null,
                "decimals": 2,
                "min": 0,
                "max": 1,
                "chartType": "stepLine",
                "id": "volume_set",
                "options": {}
            },
            {
                "value": null,
                "type": "boolean",
                "getable": true,
                "setable": true,
                "title": "Volume muted",
                "desc": null,
                "units": null,
                "id": "volume_mute",
                "options": {}
            },
            {
                "value": null,
                "type": "boolean",
                "getable": false,
                "setable": true,
                "title": "Volume up",
                "desc": null,
                "units": null,
                "id": "volume_up",
                "options": {}
            },
            {
                "value": null,
                "type": "boolean",
                "getable": false,
                "setable": true,
                "title": "Volume down",
                "desc": null,
                "units": null,
                "id": "volume_down",
                "options": {}
            }
        ],
        "amplifier": [
            {
                "value": null,
                "lastUpdated": null,
                "type": "boolean",
                "getable": true,
                "setable": true,
                "title": "Turned on",
                "desc": null,
                "units": null,
                "id": "onoff",
                "options": {}
            },
            {
                "value": null,
                "type": "number",
                "getable": true,
                "setable": true,
                "title": "Set volume",
                "desc": "Volume",
                "units": null,
                "decimals": 2,
                "min": 0,
                "max": 1,
                "chartType": "stepLine",
                "id": "volume_set",
                "options": {}
            },
            {
                "value": null,
                "type": "boolean",
                "getable": true,
                "setable": true,
                "title": "Volume muted",
                "desc": null,
                "units": null,
                "id": "volume_mute",
                "options": {}
            },
            {
                "value": null,
                "type": "boolean",
                "getable": false,
                "setable": true,
                "title": "Volume up",
                "desc": null,
                "units": null,
                "id": "volume_up",
                "options": {}
            },
            {
                "value": null,
                "type": "boolean",
                "getable": false,
                "setable": true,
                "title": "Volume down",
                "desc": null,
                "units": null,
                "id": "volume_down",
                "options": {}
            }
        ],
        "windowcoverings": [
            {
                "value": null,
                "lastUpdated": null,
                "type": "boolean",
                "getable": true,
                "setable": true,
                "title": "Turned on",
                "desc": null,
                "units": null,
                "id": "onoff",
                "options": {}
            },
            {
                "value": null,
                "type": "number",
                "getable": true,
                "setable": true,
                "title": "Dim level",
                "desc": null,
                "units": "%",
                "decimals": 2,
                "min": 0,
                "max": 1,
                "chartType": "stepLine",
                "id": "dim",
                "options": {}
            },
            {
                "value": null,
                "type": "enum",
                "getable": true,
                "setable": true,
                "title": "Window coverings state",
                "desc": null,
                "units": null,
                "values": [
                    {
                        "id": "up",
                        "title": "Up"
                    },
                    {
                        "id": "idle",
                        "title": "Idle"
                    },
                    {
                        "id": "down",
                        "title": "Down"
                    }
                ],
                "id": "windowcoverings_state",
                "options": {}
            },
            {
                "value": null,
                "type": "boolean",
                "getable": false,
                "setable": true,
                "title": "Window coverings tilt down",
                "desc": null,
                "units": null,
                "id": "windowcoverings_tilt_down",
                "options": {}
            },
            {
                "value": null,
                "type": "number",
                "getable": true,
                "setable": true,
                "title": "Window coverings tilt set",
                "desc": null,
                "units": null,
                "decimals": 2,
                "min": 0,
                "max": 1,
                "id": "windowcoverings_tilt_set",
                "options": {}
            },
            {
                "value": null,
                "type": "boolean",
                "getable": false,
                "setable": true,
                "title": "Window coverings tilt up",
                "desc": null,
                "units": null,
                "id": "windowcoverings_tilt_up",
                "options": {}
            },
            {
                "value": null,
                "type": "boolean",
                "getable": true,
                "setable": true,
                "title": "Closed",
                "desc": null,
                "units": null,
                "id": "windowcoverings_closed",
                "options": {}
            },
            {
                "value": null,
                "type": "number",
                "getable": true,
                "setable": true,
                "title": "Position",
                "desc": "Set the position of window coverings. 0% is closed, 100% is open",
                "units": "%",
                "decimals": 2,
                "min": 0,
                "max": 1,
                "chartType": "stepLine",
                "id": "windowcoverings_set",
                "options": {}
            }
        ],
        "fan": [
            {
                "value": null,
                "lastUpdated": null,
                "type": "boolean",
                "getable": true,
                "setable": true,
                "title": "Turned on",
                "desc": null,
                "units": null,
                "id": "onoff",
                "options": {}
            },
            {
                "value": null,
                "type": "number",
                "getable": true,
                "setable": true,
                "title": "Dim level",
                "desc": null,
                "units": "%",
                "decimals": 2,
                "min": 0,
                "max": 1,
                "chartType": "stepLine",
                "id": "dim",
                "options": {}
            },
            {
                "value": null,
                "type": "number",
                "getable": true,
                "setable": false,
                "title": "Power",
                "desc": "Power in watt (W)",
                "units": "W",
                "decimals": 2,
                "chartType": "stepLine",
                "id": "measure_power",
                "options": {}
            }
        ],
        "heater": [
            {
                "value": null,
                "lastUpdated": null,
                "type": "boolean",
                "getable": true,
                "setable": true,
                "title": "Turned on",
                "desc": null,
                "units": null,
                "id": "onoff",
                "options": {}
            },
            {
                "value": null,
                "type": "number",
                "getable": true,
                "setable": true,
                "title": "Dim level",
                "desc": null,
                "units": "%",
                "decimals": 2,
                "min": 0,
                "max": 1,
                "chartType": "stepLine",
                "id": "dim",
                "options": {}
            },
            {
                "value": null,
                "type": "number",
                "getable": true,
                "setable": false,
                "title": "Power",
                "desc": "Power in watt (W)",
                "units": "W",
                "decimals": 2,
                "chartType": "stepLine",
                "id": "measure_power",
                "options": {}
            }
        ],
        "kettle": [
            {
                "value": null,
                "lastUpdated": null,
                "type": "boolean",
                "getable": true,
                "setable": true,
                "title": "Turned on",
                "desc": null,
                "units": null,
                "id": "onoff",
                "options": {}
            },
            {
                "value": null,
                "type": "number",
                "getable": true,
                "setable": true,
                "title": "Target temperature",
                "desc": null,
                "units": "°C",
                "decimals": 2,
                "min": 12,
                "max": 32,
                "step": 0.5,
                "chartType": "stepLine",
                "id": "target_temperature",
                "options": {
                    "min": 12,
                    "max": 32,
                    "step": 0.5
                }
            },
            {
                "value": null,
                "type": "number",
                "getable": true,
                "setable": false,
                "title": "Temperature",
                "desc": "Temperature in degrees Celsius (°C)",
                "units": "°C",
                "decimals": 1,
                "chartType": "spline",
                "id": "measure_temperature",
                "options": {
                    "decimals": 1
                }
            },
            {
                "value": null,
                "type": "number",
                "getable": true,
                "setable": false,
                "title": "Power",
                "desc": "Power in watt (W)",
                "units": "W",
                "decimals": 2,
                "chartType": "stepLine",
                "id": "measure_power",
                "options": {}
            }
        ],
        "coffeemachine": [
            {
                "value": null,
                "lastUpdated": null,
                "type": "boolean",
                "getable": true,
                "setable": true,
                "title": "Turned on",
                "desc": null,
                "units": null,
                "id": "onoff",
                "options": {}
            },
            {
                "value": null,
                "type": "number",
                "getable": true,
                "setable": true,
                "title": "Target temperature",
                "desc": null,
                "units": "°C",
                "decimals": 2,
                "min": 12,
                "max": 32,
                "step": 0.5,
                "chartType": "stepLine",
                "id": "target_temperature",
                "options": {
                    "min": 12,
                    "max": 32,
                    "step": 0.5
                }
            },
            {
                "value": null,
                "type": "number",
                "getable": true,
                "setable": false,
                "title": "Temperature",
                "desc": "Temperature in degrees Celsius (°C)",
                "units": "°C",
                "decimals": 1,
                "chartType": "spline",
                "id": "measure_temperature",
                "options": {
                    "decimals": 1
                }
            }
        ],
        "button": [
            {
                "value": null,
                "type": "boolean",
                "getable": false,
                "setable": true,
                "title": "Button",
                "desc": null,
                "units": null,
                "id": "button",
                "options": {}
            }
        ],
        "homealarm": [
            {
                "value": null,
                "type": "enum",
                "getable": true,
                "setable": true,
                "title": "Home alarm state",
                "desc": null,
                "units": null,
                "values": [
                    {
                        "id": "armed",
                        "title": "Armed"
                    },
                    {
                        "id": "disarmed",
                        "title": "Disarmed"
                    },
                    {
                        "id": "partially_armed",
                        "title": "Partially armed"
                    }
                ],
                "id": "homealarm_state",
                "options": {}
            },
            {
                "value": null,
                "lastUpdated": null,
                "type": "boolean",
                "getable": true,
                "setable": true,
                "title": "Turned on",
                "desc": null,
                "units": null,
                "id": "onoff",
                "options": {}
            },
            {
                "value": null,
                "type": "boolean",
                "getable": false,
                "setable": true,
                "title": "Button",
                "desc": null,
                "units": null,
                "id": "button",
                "options": {}
            },
            {
                "value": null,
                "type": "boolean",
                "getable": true,
                "setable": false,
                "title": "Motion alarm",
                "desc": null,
                "units": null,
                "id": "alarm_motion",
                "options": {}
            },
            {
                "value": null,
                "type": "boolean",
                "getable": true,
                "setable": false,
                "title": "Contact alarm",
                "desc": "Contact sensor, e.g. for windows (true/false)",
                "units": null,
                "id": "alarm_contact",
                "options": {}
            }
        ],
        "thermostat": [
            {
                "value": null,
                "type": "number",
                "getable": true,
                "setable": true,
                "title": "Target temperature",
                "desc": null,
                "units": "°C",
                "decimals": 2,
                "min": 12,
                "max": 32,
                "step": 0.5,
                "chartType": "stepLine",
                "id": "target_temperature",
                "options": {
                    "min": 12,
                    "max": 32,
                    "step": 0.5
                }
            },
            {
                "value": null,
                "type": "enum",
                "getable": true,
                "setable": true,
                "title": "Thermostat mode",
                "desc": "Mode of the thermostat",
                "units": null,
                "values": [
                    {
                        "id": "auto",
                        "title": "Automatic"
                    },
                    {
                        "id": "heat",
                        "title": "Heat"
                    },
                    {
                        "id": "cool",
                        "title": "Cool"
                    },
                    {
                        "id": "off",
                        "title": "Off"
                    }
                ],
                "id": "thermostat_mode",
                "options": {}
            },
            {
                "value": null,
                "type": "number",
                "getable": true,
                "setable": false,
                "title": "Temperature",
                "desc": "Temperature in degrees Celsius (°C)",
                "units": "°C",
                "decimals": 1,
                "chartType": "spline",
                "id": "measure_temperature",
                "options": {
                    "decimals": 1
                }
            }
        ],
        "sensor": [
            {
                "value": null,
                "type": "number",
                "getable": true,
                "setable": false,
                "title": "Temperature",
                "desc": "Temperature in degrees Celsius (°C)",
                "units": "°C",
                "decimals": 1,
                "chartType": "spline",
                "id": "measure_temperature",
                "options": {
                    "decimals": 1
                }
            },
            {
                "value": null,
                "type": "number",
                "getable": true,
                "setable": false,
                "title": "CO2",
                "desc": "CO2 in Parts-per-million (ppm)",
                "units": "ppm",
                "decimals": 2,
                "chartType": "spline",
                "id": "measure_co2",
                "options": {}
            },
            {
                "value": null,
                "type": "number",
                "getable": true,
                "setable": false,
                "title": "Pressure",
                "desc": "Pressure in millibar (mbar)",
                "units": "mbar",
                "decimals": 0,
                "chartType": "spline",
                "id": "measure_pressure",
                "options": {}
            },
            {
                "value": null,
                "type": "number",
                "getable": true,
                "setable": false,
                "title": "Humidity",
                "desc": "Humidity in percent (%)",
                "units": "%",
                "decimals": 2,
                "chartType": "spline",
                "id": "measure_humidity",
                "options": {}
            },
            {
                "value": null,
                "type": "number",
                "getable": true,
                "setable": false,
                "title": "PM2.5",
                "desc": "Atmospheric particulate matter (μg/m³)",
                "units": "μg/m³",
                "decimals": 2,
                "chartType": "spline",
                "id": "measure_pm25",
                "options": {}
            },
            {
                "value": null,
                "type": "number",
                "getable": true,
                "setable": false,
                "title": "CO",
                "desc": "CO in Parts-per-million (ppm)",
                "units": "ppm",
                "decimals": 2,
                "chartType": "spline",
                "id": "measure_co",
                "options": {}
            },
            {
                "value": null,
                "type": "number",
                "getable": true,
                "setable": false,
                "title": "Current",
                "desc": "Electric current (A)",
                "units": "A",
                "decimals": 2,
                "chartType": "stepLine",
                "id": "measure_current",
                "options": {}
            },
            {
                "value": null,
                "type": "number",
                "getable": true,
                "setable": false,
                "title": "Gust angle",
                "desc": "Gust angle in degrees (°)",
                "units": "°",
                "decimals": 2,
                "chartType": "stepLine",
                "id": "measure_gust_angle",
                "options": {}
            },
            {
                "value": null,
                "type": "number",
                "getable": true,
                "setable": false,
                "title": "Gust strength",
                "desc": "Gust strength in kilometer per hour (km/h)",
                "units": "km/h",
                "decimals": 2,
                "chartType": "stepLine",
                "id": "measure_gust_strength",
                "options": {}
            },
            {
                "value": null,
                "type": "number",
                "getable": true,
                "setable": false,
                "title": "Luminance",
                "desc": "Luminance in Lux (lx)",
                "units": "lx",
                "decimals": 2,
                "chartType": "spline",
                "id": "measure_luminance",
                "options": {}
            },
            {
                "value": null,
                "type": "number",
                "getable": true,
                "setable": false,
                "title": "Noise",
                "desc": "Noise in decibel (dB)",
                "units": "dB",
                "decimals": 2,
                "chartType": "spline",
                "id": "measure_noise",
                "options": {}
            },
            {
                "value": null,
                "type": "number",
                "getable": true,
                "setable": false,
                "title": "Rain",
                "desc": "Rain in millimeter (mm)",
                "units": "mm",
                "decimals": 2,
                "chartType": "spline",
                "id": "measure_rain",
                "options": {}
            },
            {
                "value": null,
                "type": "number",
                "getable": true,
                "setable": false,
                "title": "Ultraviolet",
                "desc": "Ultraviolet in UV index (UVI)",
                "units": "UVI",
                "decimals": 2,
                "chartType": "spline",
                "id": "measure_ultraviolet",
                "options": {}
            },
            {
                "value": null,
                "type": "number",
                "getable": true,
                "setable": false,
                "title": "Voltage",
                "desc": "Voltage (V)",
                "units": "V",
                "decimals": 2,
                "chartType": "stepLine",
                "id": "measure_voltage",
                "options": {}
            },
            {
                "value": null,
                "type": "number",
                "getable": true,
                "setable": false,
                "title": "Water flow",
                "desc": "Water flow in liters per minute (L/min)",
                "units": "L/min",
                "decimals": 2,
                "chartType": "stepLine",
                "id": "measure_water",
                "options": {}
            },
            {
                "value": null,
                "type": "number",
                "getable": true,
                "setable": false,
                "title": "Wind angle",
                "desc": "Wind angle in degrees (°)",
                "units": "°",
                "decimals": 2,
                "chartType": "spline",
                "id": "measure_wind_angle",
                "options": {}
            },
            {
                "value": null,
                "type": "number",
                "getable": true,
                "setable": false,
                "title": "Wind strength",
                "desc": "Wind Strength in kilometer per hour (km/h)",
                "units": "km/h",
                "decimals": 2,
                "chartType": "spline",
                "id": "measure_wind_strength",
                "options": {}
            },
            {
                "value": null,
                "type": "number",
                "getable": true,
                "setable": false,
                "title": "Battery",
                "desc": "Battery charge in percentage (%)",
                "units": "%",
                "decimals": 2,
                "min": 0,
                "max": 100,
                "chartType": "spline",
                "id": "measure_battery",
                "options": {}
            },
            {
                "value": null,
                "type": "number",
                "getable": true,
                "setable": false,
                "title": "Energy",
                "desc": "Energy usage in kilowatt-hour (kWh)",
                "units": "kWh",
                "decimals": 2,
                "chartType": "spline",
                "id": "meter_power",
                "options": {}
            },
            {
                "value": null,
                "type": "number",
                "getable": true,
                "setable": false,
                "title": "Gas meter",
                "desc": "Gas usage in cubic meter (m³)",
                "units": "m³",
                "decimals": 2,
                "min": 0,
                "chartType": "spline",
                "id": "meter_gas",
                "options": {}
            },
            {
                "value": null,
                "type": "number",
                "getable": true,
                "setable": false,
                "title": "Rain meter",
                "desc": "Rain in cubic meter (m³)",
                "units": "m³",
                "decimals": 2,
                "chartType": "spline",
                "id": "meter_rain",
                "options": {}
            },
            {
                "value": null,
                "type": "number",
                "getable": true,
                "setable": false,
                "title": "Water meter",
                "desc": "Water usage in cubic meter (m³)",
                "units": "m³",
                "decimals": 3,
                "min": 0,
                "chartType": "spline",
                "id": "meter_water",
                "options": {}
            },
            {
                "value": null,
                "type": "number",
                "getable": true,
                "setable": false,
                "title": "Power",
                "desc": "Power in watt (W)",
                "units": "W",
                "decimals": 2,
                "chartType": "stepLine",
                "id": "measure_power",
                "options": {}
            },
            {
                "value": null,
                "type": "boolean",
                "getable": true,
                "setable": false,
                "title": "Motion alarm",
                "desc": null,
                "units": null,
                "id": "alarm_motion",
                "options": {}
            },
            {
                "value": null,
                "type": "boolean",
                "getable": true,
                "setable": false,
                "title": "Contact alarm",
                "desc": "Contact sensor, e.g. for windows (true/false)",
                "units": null,
                "id": "alarm_contact",
                "options": {}
            }
        ],
        "lock": [
            {
                "value": null,
                "type": "boolean",
                "getable": true,
                "setable": true,
                "title": "Locked",
                "desc": "True when the lock is locked",
                "units": null,
                "id": "locked",
                "options": {}
            },
            {
                "value": null,
                "type": "enum",
                "getable": true,
                "setable": true,
                "title": "Lock mode",
                "desc": null,
                "units": null,
                "values": [
                    {
                        "id": "always_locked",
                        "title": "Always locked"
                    },
                    {
                        "id": "always_unlocked",
                        "title": "Always unlocked"
                    },
                    {
                        "id": "locked_until_unlock",
                        "title": "Locked until unlocked"
                    }
                ],
                "id": "lock_mode",
                "options": {}
            }
        ],
        "blinds": [
            {
                "value": null,
                "type": "enum",
                "getable": true,
                "setable": true,
                "title": "Window coverings state",
                "desc": null,
                "units": null,
                "values": [
                    {
                        "id": "up",
                        "title": "Up"
                    },
                    {
                        "id": "idle",
                        "title": "Idle"
                    },
                    {
                        "id": "down",
                        "title": "Down"
                    }
                ],
                "id": "windowcoverings_state",
                "options": {}
            },
            {
                "value": null,
                "lastUpdated": null,
                "type": "boolean",
                "getable": true,
                "setable": true,
                "title": "Turned on",
                "desc": null,
                "units": null,
                "id": "onoff",
                "options": {}
            },
            {
                "value": null,
                "type": "boolean",
                "getable": false,
                "setable": true,
                "title": "Window coverings tilt down",
                "desc": null,
                "units": null,
                "id": "windowcoverings_tilt_down",
                "options": {}
            },
            {
                "value": null,
                "type": "number",
                "getable": true,
                "setable": true,
                "title": "Window coverings tilt set",
                "desc": null,
                "units": null,
                "decimals": 2,
                "min": 0,
                "max": 1,
                "id": "windowcoverings_tilt_set",
                "options": {}
            },
            {
                "value": null,
                "type": "boolean",
                "getable": false,
                "setable": true,
                "title": "Window coverings tilt up",
                "desc": null,
                "units": null,
                "id": "windowcoverings_tilt_up",
                "options": {}
            },
            {
                "value": null,
                "type": "boolean",
                "getable": true,
                "setable": true,
                "title": "Closed",
                "desc": null,
                "units": null,
                "id": "windowcoverings_closed",
                "options": {}
            },
            {
                "value": null,
                "type": "number",
                "getable": true,
                "setable": true,
                "title": "Position",
                "desc": "Set the position of window coverings. 0% is closed, 100% is open",
                "units": "%",
                "decimals": 2,
                "min": 0,
                "max": 1,
                "chartType": "stepLine",
                "id": "windowcoverings_set",
                "options": {}
            }
        ],
        "curtain": [
            {
                "value": null,
                "type": "enum",
                "getable": true,
                "setable": true,
                "title": "Window coverings state",
                "desc": null,
                "units": null,
                "values": [
                    {
                        "id": "up",
                        "title": "Up"
                    },
                    {
                        "id": "idle",
                        "title": "Idle"
                    },
                    {
                        "id": "down",
                        "title": "Down"
                    }
                ],
                "id": "windowcoverings_state",
                "options": {}
            },
            {
                "value": null,
                "lastUpdated": null,
                "type": "boolean",
                "getable": true,
                "setable": true,
                "title": "Turned on",
                "desc": null,
                "units": null,
                "id": "onoff",
                "options": {}
            },
            {
                "value": null,
                "type": "boolean",
                "getable": true,
                "setable": true,
                "title": "Closed",
                "desc": null,
                "units": null,
                "id": "windowcoverings_closed",
                "options": {}
            },
            {
                "value": null,
                "type": "number",
                "getable": true,
                "setable": true,
                "title": "Position",
                "desc": "Set the position of window coverings. 0% is closed, 100% is open",
                "units": "%",
                "decimals": 2,
                "min": 0,
                "max": 1,
                "chartType": "stepLine",
                "id": "windowcoverings_set",
                "options": {}
            }
        ],
        "doorbell": [
            {
                "value": null,
                "type": "boolean",
                "getable": false,
                "setable": true,
                "title": "Button",
                "desc": null,
                "units": null,
                "id": "button",
                "options": {}
            }
        ],
        "sunshade": [
            {
                "value": null,
                "type": "enum",
                "getable": true,
                "setable": true,
                "title": "Window coverings state",
                "desc": null,
                "units": null,
                "values": [
                    {
                        "id": "up",
                        "title": "Up"
                    },
                    {
                        "id": "idle",
                        "title": "Idle"
                    },
                    {
                        "id": "down",
                        "title": "Down"
                    }
                ],
                "id": "windowcoverings_state",
                "options": {}
            },
            {
                "value": null,
                "type": "boolean",
                "getable": true,
                "setable": true,
                "title": "Closed",
                "desc": null,
                "units": null,
                "id": "windowcoverings_closed",
                "options": {}
            },
            {
                "value": null,
                "type": "number",
                "getable": true,
                "setable": true,
                "title": "Position",
                "desc": "Set the position of window coverings. 0% is closed, 100% is open",
                "units": "%",
                "decimals": 2,
                "min": 0,
                "max": 1,
                "chartType": "stepLine",
                "id": "windowcoverings_set",
                "options": {}
            }
        ],
        "solarpanel": [
            {
                "value": null,
                "type": "number",
                "getable": true,
                "setable": false,
                "title": "Power",
                "desc": "Power in watt (W)",
                "units": "W",
                "decimals": 2,
                "chartType": "stepLine",
                "id": "measure_power",
                "options": {}
            },
            {
                "value": null,
                "type": "number",
                "getable": true,
                "setable": false,
                "title": "Energy",
                "desc": "Energy usage in kilowatt-hour (kWh)",
                "units": "kWh",
                "decimals": 2,
                "chartType": "spline",
                "id": "meter_power",
                "options": {}
            }
        ],
        "vacuumcleaner": [
            {
                "value": null,
                "type": "enum",
                "getable": true,
                "setable": true,
                "title": "Vacuum cleaner state",
                "desc": null,
                "units": null,
                "values": [
                    {
                        "id": "cleaning",
                        "title": "Cleaning"
                    },
                    {
                        "id": "spot_cleaning",
                        "title": "Spot cleaning"
                    },
                    {
                        "id": "docked",
                        "title": "Docked"
                    },
                    {
                        "id": "charging",
                        "title": "Charging"
                    },
                    {
                        "id": "stopped",
                        "title": "Stopped"
                    }
                ],
                "id": "vacuumcleaner_state",
                "options": {}
            },
            {
                "value": null,
                "lastUpdated": null,
                "type": "boolean",
                "getable": true,
                "setable": true,
                "title": "Turned on",
                "desc": null,
                "units": null,
                "id": "onoff",
                "options": {}
            }
        ],
        "camera": [
            {
                "value": null,
                "type": "boolean",
                "getable": true,
                "setable": false,
                "title": "Motion alarm",
                "desc": null,
                "units": null,
                "id": "alarm_motion",
                "options": {}
            },
            {
                "value": null,
                "type": "boolean",
                "getable": true,
                "setable": false,
                "title": "Battery alarm",
                "desc": "True when there is a battery warning",
                "units": null,
                "id": "alarm_battery",
                "options": {}
            },
            {
                "value": null,
                "type": "boolean",
                "getable": true,
                "setable": false,
                "title": "Tamper alarm",
                "desc": "True when tampering has been detected",
                "units": null,
                "id": "alarm_tamper",
                "options": {}
            }
        ],
        "remote": [
            {
                "value": null,
                "lastUpdated": null,
                "type": "boolean",
                "getable": true,
                "setable": true,
                "title": "Turned on",
                "desc": null,
                "units": null,
                "id": "onoff",
                "options": {}
            },
            {
                "value": null,
                "type": "number",
                "getable": true,
                "setable": true,
                "title": "Dim level",
                "desc": null,
                "units": "%",
                "decimals": 2,
                "min": 0,
                "max": 1,
                "chartType": "stepLine",
                "id": "dim",
                "options": {}
            },
            {
                "value": null,
                "type": "number",
                "getable": true,
                "setable": true,
                "title": "Set volume",
                "desc": "Volume",
                "units": null,
                "decimals": 2,
                "min": 0,
                "max": 1,
                "chartType": "stepLine",
                "id": "volume_set",
                "options": {}
            },
            {
                "value": null,
                "type": "boolean",
                "getable": false,
                "setable": true,
                "title": "Volume up",
                "desc": null,
                "units": null,
                "id": "volume_up",
                "options": {}
            },
            {
                "value": null,
                "type": "boolean",
                "getable": false,
                "setable": true,
                "title": "Volume down",
                "desc": null,
                "units": null,
                "id": "volume_down",
                "options": {}
            },
            {
                "value": null,
                "type": "boolean",
                "getable": true,
                "setable": true,
                "title": "Volume muted",
                "desc": null,
                "units": null,
                "id": "volume_mute",
                "options": {}
            },
            {
                "value": null,
                "type": "boolean",
                "getable": false,
                "setable": true,
                "title": "Channel up",
                "desc": null,
                "units": null,
                "id": "channel_up",
                "options": {}
            },
            {
                "value": null,
                "type": "boolean",
                "getable": false,
                "setable": true,
                "title": "Channel down",
                "desc": null,
                "units": null,
                "id": "channel_down",
                "options": {}
            },
            {
                "value": null,
                "type": "enum",
                "getable": true,
                "setable": true,
                "title": "Window coverings state",
                "desc": null,
                "units": null,
                "values": [
                    {
                        "id": "up",
                        "title": "Up"
                    },
                    {
                        "id": "idle",
                        "title": "Idle"
                    },
                    {
                        "id": "down",
                        "title": "Down"
                    }
                ],
                "id": "windowcoverings_state",
                "options": {}
            },
            {
                "value": null,
                "type": "boolean",
                "getable": true,
                "setable": true,
                "title": "Closed",
                "desc": null,
                "units": null,
                "id": "windowcoverings_closed",
                "options": {}
            }
        ],
        "speaker": [
            {
                "value": null,
                "type": "boolean",
                "getable": false,
                "setable": true,
                "title": "Button",
                "desc": null,
                "units": null,
                "id": "button",
                "options": {}
            },
            {
                "value": null,
                "type": "number",
                "getable": true,
                "setable": true,
                "title": "Set volume",
                "desc": "Volume",
                "units": null,
                "decimals": 2,
                "min": 0,
                "max": 1,
                "chartType": "stepLine",
                "id": "volume_set",
                "options": {}
            },
            {
                "value": null,
                "type": "boolean",
                "getable": true,
                "setable": true,
                "title": "Volume muted",
                "desc": null,
                "units": null,
                "id": "volume_mute",
                "options": {}
            },
            {
                "value": null,
                "type": "boolean",
                "getable": false,
                "setable": true,
                "title": "Volume up",
                "desc": null,
                "units": null,
                "id": "volume_up",
                "options": {}
            },
            {
                "value": null,
                "type": "boolean",
                "getable": false,
                "setable": true,
                "title": "Volume down",
                "desc": null,
                "units": null,
                "id": "volume_down",
                "options": {}
            },
            {
                "value": null,
                "type": "boolean",
                "getable": true,
                "setable": true,
                "title": "Playing",
                "desc": null,
                "units": null,
                "id": "speaker_playing",
                "options": {}
            },
            {
                "value": null,
                "type": "boolean",
                "getable": false,
                "setable": true,
                "title": "Next",
                "desc": null,
                "units": null,
                "id": "speaker_next",
                "options": {}
            },
            {
                "value": null,
                "type": "boolean",
                "getable": false,
                "setable": true,
                "title": "Previous",
                "desc": null,
                "units": null,
                "id": "speaker_prev",
                "options": {}
            },
            {
                "value": null,
                "type": "boolean",
                "getable": true,
                "setable": true,
                "title": "Shuffle",
                "desc": null,
                "units": null,
                "id": "speaker_shuffle",
                "options": {}
            },
            {
                "value": null,
                "type": "enum",
                "getable": true,
                "setable": true,
                "title": "Repeat",
                "desc": null,
                "units": null,
                "values": [
                    {
                        "id": "none",
                        "title": "Off"
                    },
                    {
                        "id": "track",
                        "title": "Repeat Track"
                    },
                    {
                        "id": "playlist",
                        "title": "Repeat Playlist"
                    }
                ],
                "id": "speaker_repeat",
                "options": {}
            },
            {
                "value": null,
                "type": "string",
                "getable": true,
                "setable": false,
                "title": "Artist",
                "desc": null,
                "units": null,
                "id": "speaker_artist",
                "options": {}
            },
            {
                "value": null,
                "type": "string",
                "getable": true,
                "setable": false,
                "title": "Album",
                "desc": null,
                "units": null,
                "id": "speaker_album",
                "options": {}
            },
            {
                "value": null,
                "type": "string",
                "getable": true,
                "setable": false,
                "title": "Track",
                "desc": null,
                "units": null,
                "id": "speaker_track",
                "options": {}
            },
            {
                "value": null,
                "type": "number",
                "getable": true,
                "setable": false,
                "title": "Duration",
                "desc": null,
                "units": null,
                "id": "speaker_duration",
                "options": {}
            },
            {
                "value": null,
                "type": "number",
                "getable": true,
                "setable": false,
                "title": "Position",
                "desc": null,
                "units": null,
                "id": "speaker_position",
                "options": {}
            }
        ]
    }
}
