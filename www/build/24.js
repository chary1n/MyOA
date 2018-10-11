webpackJsonp([24],{

/***/ 676:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./node_modules/@ionic-native/ble/index.js
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * @name BLE
 * @description
 * This plugin enables communication between a phone and Bluetooth Low Energy (BLE) peripherals.
 *
 * The plugin provides a simple JavaScript API for iOS and Android.
 *
 * - Scan for peripherals
 * - Connect to a peripheral
 * - Read the value of a characteristic
 * - Write new value to a characteristic
 * - Get notified when characteristic's value changes
 *
 * Advertising information is returned when scanning for peripherals. Service, characteristic, and property info is returned when connecting to a peripheral. All access is via service and characteristic UUIDs. The plugin manages handles internally.
 *
 * Simultaneous connections to multiple peripherals are supported.
 *
 * @usage
 *
 * ```typescript
 *
 * import { BLE } from '@ionic-native/ble';
 *
 * constructor(private ble: BLE) { }
 *
 * ```
 *
 * ## Peripheral Data
 *
 * Peripheral Data is passed to the success callback when scanning and connecting. Limited data is passed when scanning.
 *
 * ```typescript
 *   {
 *       'name': 'Battery Demo',
 *       'id': '20:FF:D0:FF:D1:C0',
 *       'advertising': [2,1,6,3,3,15,24,8,9,66,97,116,116,101,114,121],
 *       'rssi': -55
 *   }
 * ```
 * After connecting, the peripheral object also includes service, characteristic and descriptor information.
 *
 * ```typescript
 *   {
 *       'name': 'Battery Demo',
 *       'id': '20:FF:D0:FF:D1:C0',
 *       'advertising': [2,1,6,3,3,15,24,8,9,66,97,116,116,101,114,121],
 *       'rssi': -55,
 *       'services': [
 *           '1800',
 *           '1801',
 *           '180f'
 *       ],
 *       'characteristics': [
 *           {
 *               'service': '1800',
 *               'characteristic': '2a00',
 *               'properties': [
 *                   'Read'
 *               ]
 *           },
 *           {
 *               'service': '1800',
 *               'characteristic': '2a01',
 *               'properties': [
 *                   'Read'
 *               ]
 *           },
 *           {
 *               'service': '1801',
 *               'characteristic': '2a05',
 *               'properties': [
 *                   'Read'
 *               ]
 *           },
 *           {
 *               'service': '180f',
 *               'characteristic': '2a19',
 *               'properties': [
 *                   'Read'
 *               ],
 *               'descriptors': [
 *                   {
 *                       'uuid': '2901'
 *                   },
 *                   {
 *                       'uuid': '2904'
 *                   }
 *               ]
 *           }
 *       ]
 *   }
 * ```
 *
 * ## Advertising Data
 * Bluetooth advertising data is returned in when scanning for devices. The format format varies depending on your platform. On Android advertising data will be the raw advertising bytes. iOS does not allow access to raw advertising data, so a dictionary of data is returned.
 *
 * The advertising information for both Android and iOS appears to be a combination of advertising data and scan response data.
 *
 * ### Android
 *
 * ```typescript
 *   {
 *       'name': 'demo',
 *       'id': '00:1A:7D:DA:71:13',
 *       'advertising': ArrayBuffer,
 *      'rssi': -37
 *  }
 * ```
 *
 * Convert the advertising info to a Uint8Array for processing. `var adData = new Uint8Array(peripheral.advertising)`
 *
 * ### iOS
 *
 * Note that iOS uses the string value of the constants for the [Advertisement Data Retrieval Keys](https://developer.apple.com/library/ios/documentation/CoreBluetooth/Reference/CBCentralManagerDelegate_Protocol/index.html#//apple_ref/doc/constant_group/Advertisement_Data_Retrieval_Keys). This will likely change in the future.
 *
 * ```typescript
 *   {
 *       'name': 'demo',
 *       'id': 'D8479A4F-7517-BCD3-91B5-3302B2F81802',
 *       'advertising': {
 *           'kCBAdvDataChannel': 37,
 *           'kCBAdvDataServiceData': {
 *               'FED8': {
 *                   'byteLength': 7 // data not shown
 *               }
 *           },
 *           'kCBAdvDataLocalName': 'demo',
 *           'kCBAdvDataServiceUUIDs': ['FED8'],
 *           'kCBAdvDataManufacturerData': {
 *               'byteLength': 7  // data not shown
 *           },
 *           'kCBAdvDataTxPowerLevel': 32,
 *           'kCBAdvDataIsConnectable': true
 *       },
 *       'rssi': -53
 *   }
 * ```
 *
 * ## Typed Arrays
 *
 * This plugin uses typed Arrays or ArrayBuffers for sending and receiving data.
 *
 * This means that you need convert your data to ArrayBuffers before sending and from ArrayBuffers when receiving.
 *
 * ```typescript
 *   // ASCII only
 *   function stringToBytes(string) {
 *      var array = new Uint8Array(string.length);
 *      for (var i = 0, l = string.length; i < l; i++) {
 *          array[i] = string.charCodeAt(i);
 *       }
 *       return array.buffer;
 *   }
 *
 *   // ASCII only
 *   function bytesToString(buffer) {
 *       return String.fromCharCode.apply(null, new Uint8Array(buffer));
 *   }
 * ```
 * You can read more about typed arrays in these articles on [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) and [HTML5 Rocks](http://www.html5rocks.com/en/tutorials/webgl/typed_arrays/).
 *
 * ## UUIDs
 *
 * UUIDs are always strings and not numbers. Some 16-bit UUIDs, such as '2220' look like integers, but they're not. (The integer 2220 is 0x8AC in hex.) This isn't a problem with 128 bit UUIDs since they look like strings 82b9e6e1-593a-456f-be9b-9215160ebcac. All 16-bit UUIDs should also be passed to methods as strings.
 *
 */
var BLE = (function (_super) {
    __extends(BLE, _super);
    function BLE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Scan and discover BLE peripherals for the specified amount of time.
     *
     * @usage
     * ```
     * BLE.scan([], 5).subscribe(device => {
     *   console.log(JSON.stringify(device));
     * });
     * ```
     * @param {string[]} services  List of service UUIDs to discover, or `[]` to find all devices
     * @param {number} seconds  Number of seconds to run discovery
     * @returns {Observable<any>} Returns an Observable that notifies of each peripheral that is discovered during the specified time.
     */
    BLE.prototype.scan = function (services, seconds) { return; };
    /**
     * Scan and discover BLE peripherals until `stopScan` is called.
     *
     * @usage
     * ```
     * BLE.startScan([]).subscribe(device => {
     *   console.log(JSON.stringify(device));
     * });
     *
     * setTimeout(() => {
     *   BLE.stopScan();
     * }, 5000);
     * ```
     * @param {string[]} services  List of service UUIDs to discover, or `[]` to find all devices
     * @returns {Observable<any>} Returns an Observable that notifies of each peripheral discovered.
     */
    BLE.prototype.startScan = function (services) { return; };
    /**
     * Scans for BLE devices. This function operates similarly to the `startScan` function, but allows you to specify extra options (like allowing duplicate device reports).
     * @param {string[]} services  List of service UUIDs to discover, or `[]` to find all devices
     * @param options {any}
     * @returns {Observable<any>} Returns an Observable that notifies of each peripheral discovered.
     */
    BLE.prototype.startScanWithOptions = function (services, options) { return; };
    /**
     * Stop a scan started by `startScan`.
     *
     * @usage
     * ```
     * BLE.startScan([]).subscribe(device => {
     *   console.log(JSON.stringify(device));
     * });
     * setTimeout(() => {
     *   BLE.stopScan().then(() => { console.log('scan stopped'); });
     * }, 5000);
     * ```
     * @return returns a Promise.
     */
    BLE.prototype.stopScan = function () { return; };
    /**
     * Connect to a peripheral.
     * @usage
     * ```
     *   BLE.connect('12:34:56:78:9A:BC').subscribe(peripheralData => {
     *     console.log(peripheralData);
     *   },
     *   peripheralData => {
     *     console.log('disconnected');
     *   });
     * ```
     * @param deviceId {string}  UUID or MAC address of the peripheral
     * @return Returns an Observable that notifies of connect/disconnect.
     */
    BLE.prototype.connect = function (deviceId) { return; };
    /**
     * Disconnect from a peripheral.
     * @usage
     * ```
     *   BLE.disconnect('12:34:56:78:9A:BC').then(() => {
     *     console.log('Disconnected');
     *   });
     * ```
     * @param deviceId {string}  UUID or MAC address of the peripheral
     * @return Returns a Promise
     */
    BLE.prototype.disconnect = function (deviceId) { return; };
    /**
     * Read the value of a characteristic.
     *
     * @param {string} deviceId  UUID or MAC address of the peripheral
     * @param {string} serviceUUID  UUID of the BLE service
     * @param {string} characteristicUUID  UUID of the BLE characteristic
     * @return Returns a Promise
     */
    BLE.prototype.read = function (deviceId, serviceUUID, characteristicUUID) { return; };
    ;
    /**
     * Write the value of a characteristic.
     * @usage
     * ```
     * // send 1 byte to switch a light on
     * var data = new Uint8Array(1);
     * data[0] = 1;
     * BLE.write(device_id, 'FF10', 'FF11', data.buffer);
     *
     * // send a 3 byte value with RGB color
     * var data = new Uint8Array(3);
     * data[0] = 0xFF;  // red
     * data[0] = 0x00; // green
     * data[0] = 0xFF; // blue
     * BLE.write(device_id, 'ccc0', 'ccc1', data.buffer);
     *
     * // send a 32 bit integer
     * var data = new Uint32Array(1);
     * data[0] = counterInput.value;
     * BLE.write(device_id, SERVICE, CHARACTERISTIC, data.buffer);
     *
     * ```
     * @param {string} deviceId  UUID or MAC address of the peripheral
     * @param {string} serviceUUID  UUID of the BLE service
     * @param {string} characteristicUUID  UUID of the BLE characteristic
     * @param {ArrayBuffer} value  Data to write to the characteristic, as an ArrayBuffer.
     * @return Returns a Promise
     */
    BLE.prototype.write = function (deviceId, serviceUUID, characteristicUUID, value) { return; };
    /**
     * Write the value of a characteristic without waiting for confirmation from the peripheral.
     *
     * @param {string} deviceId  UUID or MAC address of the peripheral
     * @param {string} serviceUUID  UUID of the BLE service
     * @param {string} characteristicUUID  UUID of the BLE characteristic
     * @param {ArrayBuffer} value  Data to write to the characteristic, as an ArrayBuffer.
     * @return Returns a Promise
     */
    BLE.prototype.writeWithoutResponse = function (deviceId, serviceUUID, characteristicUUID, value) { return; };
    /**
     * Register to be notified when the value of a characteristic changes.
     *
     * @usage
     * ```
     * BLE.startNotification(device_id, 'FF10', 'FF11').subscribe(buffer => {
     *   console.log(String.fromCharCode.apply(null, new Uint8Array(buffer));
     * });
     * ```
     *
     * @param {string} deviceId  UUID or MAC address of the peripheral
     * @param {string} serviceUUID  UUID of the BLE service
     * @param {string} characteristicUUID  UUID of the BLE characteristic
     * @return Returns an Observable that notifies of characteristic changes.
     */
    BLE.prototype.startNotification = function (deviceId, serviceUUID, characteristicUUID) { return; };
    /**
     * Stop being notified when the value of a characteristic changes.
     *
     * @param {string} deviceId  UUID or MAC address of the peripheral
     * @param {string} serviceUUID  UUID of the BLE service
     * @param {string} characteristicUUID  UUID of the BLE characteristic
     * @returns {Promise<any>}
     */
    BLE.prototype.stopNotification = function (deviceId, serviceUUID, characteristicUUID) { return; };
    /**
     * Report the connection status.
     *
     * @usage
     * ```
     * BLE.isConnected('FFCA0B09-CB1D-4DC0-A1EF-31AFD3EDFB53').then(
     *   () => { console.log('connected'); },
     *   () => { console.log('not connected'); }
     * );
     * ```
     * @param {string} deviceId  UUID or MAC address of the peripheral
     * @returns {Promise<any>}
     */
    BLE.prototype.isConnected = function (deviceId) { return; };
    /**
     * Report if bluetooth is enabled.
     *
     * @returns {Promise<void>} Returns a Promise that resolves if Bluetooth is enabled, and rejects if disabled.
     */
    BLE.prototype.isEnabled = function () { return; };
    /**
     * Register to be notified when Bluetooth state changes on the device.
     *
     * @usage
     * ```
     * BLE.startStateNotifications().subscribe(state => {
     *   console.log("Bluetooth is " + state);
     * });
     * ```
     *
     * @return Returns an Observable that notifies when the Bluetooth is enabled or disabled on the device.
     */
    BLE.prototype.startStateNotifications = function () { return; };
    /**
     * Stop state notifications.
     *
     * @returns {Promise<any>}
     */
    BLE.prototype.stopStateNotifications = function () { return; };
    /**
     * Open System Bluetooth settings (Android only).
     *
     * @returns {Promise<any>}
     */
    BLE.prototype.showBluetoothSettings = function () { return; };
    /**
     * Enable Bluetooth on the device (Android only).
     *
     * @returns {Promise<any>}
     */
    BLE.prototype.enable = function () { return; };
    /**
     * Read the RSSI value on the device connection.
     *
     * @param {string} deviceId  UUID or MAC address of the peripheral
     *
     *@returns {Promise<any>}
     */
    BLE.prototype.readRSSI = function (deviceId) { return; };
    BLE.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"] },
    ];
    /** @nocollapse */
    BLE.ctorParameters = function () { return []; };
    __decorate([
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["a" /* Cordova */]({
            observable: true
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Array, Number]),
        __metadata("design:returntype", __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"])
    ], BLE.prototype, "scan", null);
    __decorate([
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["a" /* Cordova */]({
            observable: true,
            clearFunction: 'stopScan',
            clearWithArgs: false
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Array]),
        __metadata("design:returntype", __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"])
    ], BLE.prototype, "startScan", null);
    __decorate([
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["a" /* Cordova */]({
            observable: true,
            clearFunction: 'stopScan',
            clearWithArgs: false
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Array, Object]),
        __metadata("design:returntype", __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"])
    ], BLE.prototype, "startScanWithOptions", null);
    __decorate([
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["a" /* Cordova */](),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], BLE.prototype, "stopScan", null);
    __decorate([
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["a" /* Cordova */]({
            observable: true,
            clearFunction: 'disconnect',
            clearWithArgs: true
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"])
    ], BLE.prototype, "connect", null);
    __decorate([
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["a" /* Cordova */](),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], BLE.prototype, "disconnect", null);
    __decorate([
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["a" /* Cordova */](),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String, String]),
        __metadata("design:returntype", Promise)
    ], BLE.prototype, "read", null);
    __decorate([
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["a" /* Cordova */](),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String, String, ArrayBuffer]),
        __metadata("design:returntype", Promise)
    ], BLE.prototype, "write", null);
    __decorate([
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["a" /* Cordova */](),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String, String, ArrayBuffer]),
        __metadata("design:returntype", Promise)
    ], BLE.prototype, "writeWithoutResponse", null);
    __decorate([
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["a" /* Cordova */]({
            observable: true,
            clearFunction: 'stopNotification',
            clearWithArgs: true
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String, String]),
        __metadata("design:returntype", __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"])
    ], BLE.prototype, "startNotification", null);
    __decorate([
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["a" /* Cordova */](),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String, String]),
        __metadata("design:returntype", Promise)
    ], BLE.prototype, "stopNotification", null);
    __decorate([
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["a" /* Cordova */](),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], BLE.prototype, "isConnected", null);
    __decorate([
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["a" /* Cordova */](),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], BLE.prototype, "isEnabled", null);
    __decorate([
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["a" /* Cordova */]({
            observable: true,
            clearFunction: 'stopStateNotifications',
            clearWithArgs: false
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"])
    ], BLE.prototype, "startStateNotifications", null);
    __decorate([
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["a" /* Cordova */](),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], BLE.prototype, "stopStateNotifications", null);
    __decorate([
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["a" /* Cordova */](),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], BLE.prototype, "showBluetoothSettings", null);
    __decorate([
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["a" /* Cordova */](),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], BLE.prototype, "enable", null);
    __decorate([
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["a" /* Cordova */](),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], BLE.prototype, "readRSSI", null);
    BLE = __decorate([
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["h" /* Plugin */]({
            pluginName: 'BLE',
            plugin: 'cordova-plugin-ble-central',
            pluginRef: 'ble',
            repo: 'https://github.com/don/cordova-plugin-ble-central',
            platforms: ['Android', 'iOS']
        })
    ], BLE);
    return BLE;
}(__WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["g" /* IonicNativePlugin */]));

//# sourceMappingURL=index.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/kaoqin/kaoqin.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__kaoqinService__ = __webpack_require__(752);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_device__ = __webpack_require__(898);
var kaoqin___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var kaoqin___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







// import { Device } from 'ionic-native'
/**
 * Generated class for the KaoqinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var KaoqinPage = (function () {
    function KaoqinPage(navCtrl, navParams, storage, kaoqinService, datePipe, ble, toastCtrl, loading, elementRef, alertCtrl, platform, device) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.kaoqinService = kaoqinService;
        this.datePipe = datePipe;
        this.ble = ble;
        this.toastCtrl = toastCtrl;
        this.loading = loading;
        this.elementRef = elementRef;
        this.alertCtrl = alertCtrl;
        this.platform = platform;
        this.device = device;
        this.isWrite = true;
        this.isLook = false;
        this.show_type = "me";
        this.items = [];
        this.scan_list = [];
        this.device_list = [];
        this.currentDayList = [];
        this.currentDay = 0;
        this.currentMonth = 0;
        this.currentYear = 0;
        this.items_day = [];
        this.is_show_tongji = false;
        this.attendance_count = 0;
        this.is_ble_on = false;
        this.isShowOnAlert = false;
        this.isShowOffAlert = false;
        this.isShowFail = false;
        this.isShowFail_Three = false;
        this.isShowActive = true;
        this.has_start = false;
        this.fail_times = 0;
        this.kaoqinService.get_ble_device().then(function (res) {
            if (res.result.res_data && res.result.res_code == 1) {
                _this.device_list = res.result.res_data;
            }
        });
        this.storage.get('user')
            .then(function (res) {
            // console.log(res)
            _this.kaoqinService.get_is_department(res.result.res_data.user_id).then(function (res) {
                if (res.result.res_data && res.result.res_code == 1) {
                    // console.log(res)
                    _this.is_show_tongji = res.result.res_data.is_manager;
                }
            });
        });
        //  console.log('Device UUID is: ' + this.device.uuid);
        //  alert(this.device.uuid)
    }
    KaoqinPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        // console.log(this.navParams.get('need_fresh'))
        if (this.navParams.get('need_fresh') == true) {
            this.navParams.data.need_fresh = false;
            // this.reload_statics()
            this.kaoqinService.get_today_attendance(this.formatTime_day_start(new Date()), this.formatTime_day_end(new Date()), this.user.user_id).then(function (res) {
                // console.log(res)
                if (res.result.res_data && res.result.res_code == 1) {
                    _this.items = res.result.res_data;
                    var count = 0;
                    if (_this.items.length * 140 + 30 > 400) {
                        _this.change_divClass_height(_this.items.length * 140 + 30);
                    }
                    for (var _i = 0, _a = _this.items; _i < _a.length; _i++) {
                        var item = _a[_i];
                        if (item.check_in) {
                            _this.has_start = true;
                            count += 1;
                        }
                        if (item.check_out) {
                            count += 1;
                        }
                    }
                    _this.attendance_count = count;
                }
            });
        }
    };
    KaoqinPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.change_divClass_height(400);
        this.storage.get('user')
            .then(function (res) {
            // console.log(res)
            _this.user = res.result.res_data;
            _this.user_ava = res.result.res_data.user_ava;
            _this.user_name = res.result.res_data.name;
            _this.kaoqinService.get_today_attendance(_this.formatTime_day_start(new Date()), _this.formatTime_day_end(new Date()), _this.user.user_id).then(function (res) {
                // console.log(res)
                if (res.result.res_data && res.result.res_code == 1) {
                    _this.items = res.result.res_data;
                    var count = 0;
                    if (_this.items.length * 140 + 30 > 400) {
                        _this.change_divClass_height(_this.items.length * 140 + 30);
                    }
                    for (var _i = 0, _a = _this.items; _i < _a.length; _i++) {
                        var item = _a[_i];
                        if (item.check_in) {
                            _this.has_start = true;
                            count += 1;
                        }
                        if (item.check_out) {
                            count += 1;
                        }
                    }
                    _this.attendance_count = count;
                }
            });
        });
        this.writeImg = "assets/img/journal_sheet/write_logcolor.png";
        this.lookImg = "assets/img/journal_sheet/look_log.png";
    };
    KaoqinPage.prototype.openBle = function () {
        // this.ble.enable().then(res=>{
        //   console.log(res)
        // });
    };
    KaoqinPage.prototype.scan = function () {
        // this.ble.scan([], 5).subscribe(device => {
        //   console.log(JSON.stringify(device));
        //   });
    };
    KaoqinPage.prototype.chooseWrite = function () {
        this.isWrite = true;
        this.isLook = false;
        this.writeImg = "assets/img/journal_sheet/write_logcolor.png";
        this.lookImg = "assets/img/journal_sheet/look_log.png";
    };
    KaoqinPage.prototype.chooseLook = function () {
        var _this = this;
        this.items_day = [];
        this.isWrite = false;
        this.isLook = true;
        this.writeImg = "assets/img/journal_sheet/write_log.png";
        this.lookImg = "assets/img/journal_sheet/look_logcolor.png";
        this.show_type = "me";
        var Y = new Date().getFullYear();
        var m = new Date().getMonth() + 1;
        var d = new Date().getDate();
        this.currentDate_date = new Date(Y + "/" + m + "/" + d);
        this.currentDate = (this.currentDate_date.getMonth() + 1) + '月';
        this.currentDay = this.currentDate_date.getDate();
        this.currentMonth = this.currentDate_date.getMonth() + 1;
        this.currentYear = this.currentDate_date.getFullYear();
        this.setSchedule(this.currentDate_date);
        this.kaoqinService.get_today_attendance(this.formatTime_day_start(new Date()), this.formatTime_day_end(new Date()), this.user.user_id).then(function (res) {
            // console.log(res)
            if (res.result.res_data && res.result.res_code == 1) {
                _this.items_day = res.result.res_data;
                if (_this.items_day.length * 140 + 30 > 400) {
                    _this.change_divClass_height(_this.items_day.length * 140 + 30);
                }
                for (var _i = 0, _a = _this.items_day; _i < _a.length; _i++) {
                    var item = _a[_i];
                    if (item.check_in) {
                        _this.has_start = true;
                    }
                }
            }
        });
    };
    KaoqinPage.prototype.click_me = function () {
        var _this = this;
        this.show_type = "me";
        var Y = new Date().getFullYear();
        var m = new Date().getMonth() + 1;
        var d = new Date().getDate();
        this.currentDate_date = new Date(Y + "/" + m + "/" + d);
        this.currentDate = (this.currentDate_date.getMonth() + 1) + '月';
        this.currentDay = this.currentDate_date.getDate();
        this.currentMonth = this.currentDate_date.getMonth() + 1;
        this.currentYear = this.currentDate_date.getFullYear();
        this.setSchedule(this.currentDate_date);
        this.kaoqinService.get_today_attendance(this.formatTime_day_start(new Date()), this.formatTime_day_end(new Date()), this.user.user_id).then(function (res) {
            // console.log(res)
            if (res.result.res_data && res.result.res_code == 1) {
                _this.items_day = res.result.res_data;
                if (_this.items_day.length * 140 + 30 > 400) {
                    _this.change_divClass_height(_this.items_day.length * 140 + 30);
                }
                for (var _i = 0, _a = _this.items_day; _i < _a.length; _i++) {
                    var item = _a[_i];
                    if (item.check_in) {
                        _this.has_start = true;
                    }
                }
            }
        });
    };
    KaoqinPage.prototype.click_day = function () {
        this.show_type = "day";
        var Y = new Date().getFullYear();
        var m = new Date().getMonth() + 1;
        var d = new Date().getDate();
        this.currentDate_date = new Date(Y + "/" + m + "/" + d);
        this.currentDate_day = (new Date().getMonth() + 1) + "月" + new Date().getDate() + "日";
        this.get_day_data(this.currentDate_date);
    };
    KaoqinPage.prototype.click_month = function () {
        this.show_type = "month";
    };
    KaoqinPage.prototype.formatTime_day_start = function (date) {
        var timestamp = Date.parse(this.datePipe.transform(date, 'yyyy-MM-dd HH:mm:ss').replace(/-/g, '/'));
        var timestamp_now = timestamp / 1000 - 24 * 60 * 60;
        var date_now = new Date(timestamp_now * 1000);
        var year = date_now.getFullYear();
        var month = date_now.getMonth() + 1;
        var day = date_now.getDate();
        var hour = 16;
        var minute = 0;
        var second = 0;
        return [year, month, day].join('-') + ' ' + [hour, minute, second].join(':');
    };
    KaoqinPage.prototype.formatTime_day_end = function (date) {
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hour = 15;
        var minute = 59;
        var second = 59;
        return [year, month, day].join('-') + ' ' + [hour, minute, second].join(':');
    };
    KaoqinPage.prototype.formatTime_odoo = function (date) {
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hour = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        return [year, this.formatO(month), this.formatO(day)].join('-') + ' ' + [this.formatO(hour), this.formatO(minute), this.formatO(second)].join(':');
    };
    KaoqinPage.prototype.calcStart = function (item) {
        var timestamp_e = Date.parse(item.check_in.replace(/-/g, '/'));
        // console.log(timestamp_e)
        var timestamp_end = timestamp_e / 1000 + 8 * 60 * 60;
        var date_end = new Date(timestamp_end * 1000);
        var time_str = [this.formatO(date_end.getHours()), this.formatO(date_end.getMinutes())].join(':');
        return time_str;
    };
    KaoqinPage.prototype.calcEnd = function (item) {
        var timestamp_e = Date.parse(item.check_out.replace(/-/g, '/'));
        // console.log(timestamp_e)
        var timestamp_end = timestamp_e / 1000 + 8 * 60 * 60;
        var date_end = new Date(timestamp_end * 1000);
        var time_str = [this.formatO(date_end.getHours()), this.formatO(date_end.getMinutes())].join(':');
        return time_str;
    };
    KaoqinPage.prototype.formatO = function (date) {
        return String(date).length == 2 ? date : '0' + date;
    };
    KaoqinPage.prototype.change_divClass_height = function (height) {
        var elementContent = document.getElementById("divClass");
        return elementContent.style.height = height + "px";
    };
    KaoqinPage.prototype.start_work = function () {
        // console.log(this.items[0])
        var has_in = false;
        for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
            var one_item = _a[_i];
            if (one_item.check_in) {
                has_in = true;
            }
        }
        if (!this.items || !this.items.length) {
            this.startClick();
        }
        else {
            if (has_in) {
                var ctrl = this.alertCtrl;
                var that = this;
                ctrl.create({
                    title: '提示',
                    subTitle: "已经打过上班卡了",
                    buttons: [{
                            text: '确定',
                            handler: function () {
                                // that.startClick()
                            }
                        }
                    ]
                }).present();
            }
            else {
                this.startClick();
            }
        }
    };
    KaoqinPage.prototype.end_work = function () {
        // console.log(this.items[0])
        if (!this.items || !this.items.length) {
            var ctrl = this.alertCtrl;
            var that_1 = this;
            ctrl.create({
                title: '提示',
                subTitle: "还没打过上班卡，确定下班？",
                buttons: [{
                        text: '取消',
                        handler: function () {
                            // that.startClick()
                        }
                    }, {
                        text: '确定',
                        handler: function () {
                            that_1.endClick();
                        }
                    }
                ]
            }).present();
        }
        else {
            var has_out = false;
            for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
                var one_item = _a[_i];
                if (one_item.check_out) {
                    has_out = true;
                }
            }
            var has_in = false;
            for (var _b = 0, _c = this.items; _b < _c.length; _b++) {
                var one_item = _c[_b];
                if (one_item.check_in) {
                    has_in = true;
                }
            }
            if (has_in) {
                if (has_out) {
                    var ctrl = this.alertCtrl;
                    var that_2 = this;
                    ctrl.create({
                        title: '提示',
                        subTitle: "已经打过下班卡了,确定更新？",
                        buttons: [{
                                text: '取消',
                                handler: function () {
                                    // that.startClick()
                                }
                            }, {
                                text: '确定',
                                handler: function () {
                                    that_2.endClick();
                                }
                            }
                        ]
                    }).present();
                }
                else {
                    this.endClick();
                }
            }
            else {
                var ctrl = this.alertCtrl;
                var that_3 = this;
                ctrl.create({
                    title: '提示',
                    subTitle: "还没打过上班卡，确定下班？",
                    buttons: [{
                            text: '取消',
                            handler: function () {
                                // that.startClick()
                            }
                        }, {
                            text: '确定',
                            handler: function () {
                                that_3.endClick();
                            }
                        }
                    ]
                }).present();
            }
        }
    };
    KaoqinPage.prototype.setSchedule = function (currentObj) {
        var _this = this;
        var m = currentObj.getMonth() + 1;
        var Y = currentObj.getFullYear();
        var d = currentObj.getDate();
        var dayString = Y + '/' + m + '/' + currentObj.getDate();
        var currentDayNum = new Date(Y, m, 0).getDate();
        var currentDayWeek = currentObj.getUTCDay() + 1;
        var result = currentDayWeek - (d % 7 - 1);
        var firstKey = result <= 0 ? 7 + result : result;
        var currentDayList = [];
        var total_weeks = this.getWeeks(Y, m);
        var f = 0;
        for (var i = 0; i < total_weeks * 7; i++) {
            var data = [];
            var date_obj = {
                y: Y,
                m: m,
                d: 0,
            };
            if (i < firstKey - 1) {
                if (date_obj.d == 0) {
                    currentDayList[i] = {
                        y: Y,
                        m: m,
                        d: "",
                        is_late: false,
                        is_queqin: false,
                    };
                }
            }
            else {
                if (f < currentDayNum) {
                    date_obj.d = f + 1;
                    currentDayList[i] = date_obj;
                    f = currentDayList[i].d;
                }
                else if (f >= currentDayNum) {
                    currentDayList[i] = {
                        y: Y,
                        m: m,
                        d: "",
                        is_late: false,
                        is_queqin: false,
                    };
                }
            }
            this.currentDayList = currentDayList;
        }
        var month_str = this.currentDate_date.getFullYear() + "-" + this.formatO(this.currentDate_date.getMonth() + 1);
        this.kaoqinService.get_month_attendance(month_str, this.user.user_id).then(function (res) {
            if (res.result.res_data && res.result.res_code == 1) {
                _this.attendance_data = res.result.res_data;
                // 缺勤天数
                for (var _i = 0, _a = _this.attendance_data.calc_ab_arr; _i < _a.length; _i++) {
                    var date = _a[_i];
                    for (var i = 0; i < _this.currentDayList.length; i++) {
                        if (date == _this.formatO(_this.currentDayList[i].d)) {
                            _this.currentDayList[i].is_queqin = true;
                        }
                    }
                }
                // 迟到天数
                for (var _b = 0, _c = _this.attendance_data.calc_late; _b < _c.length; _b++) {
                    var date = _c[_b];
                    for (var i = 0; i < _this.currentDayList.length; i++) {
                        if (date == _this.formatO(_this.currentDayList[i].d)) {
                            _this.currentDayList[i].is_late = true;
                        }
                    }
                }
            }
        });
    };
    KaoqinPage.prototype.setTimeSchedule = function (currentObj) {
        this.currentDay = currentObj.getDate();
        this.currentMonth = currentObj.getMonth();
        this.currentYear = currentObj.getFullYear();
        var m = currentObj.getMonth() + 1;
        var Y = currentObj.getFullYear();
        var d = currentObj.getDate();
        var dayString = Y + '/' + m + '/' + currentObj.getDate();
        var currentDayNum = new Date(Y, m, 0).getDate();
        var currentDayWeek = currentObj.getUTCDay() + 1;
        var result = currentDayWeek - (d % 7 - 1);
        var firstKey = result <= 0 ? 7 + result : result;
        var currentDayList = [];
        var total_weeks = this.getWeeks(Y, m);
        var f = 0;
        for (var i = 0; i < total_weeks * 7; i++) {
            var data = [];
            var date_obj = {
                y: Y,
                m: m,
                d: 0,
            };
            if (i < firstKey - 1) {
                if (date_obj.d == 0) {
                    currentDayList[i] = {
                        y: Y,
                        m: m,
                        d: "",
                        is_late: false,
                        is_queqin: false,
                    };
                }
            }
            else {
                if (f < currentDayNum) {
                    date_obj.d = f + 1;
                    currentDayList[i] = date_obj;
                    f = currentDayList[i].d;
                }
                else if (f >= currentDayNum) {
                    currentDayList[i] = date_obj;
                }
            }
            this.currentDayList = currentDayList;
        }
    };
    KaoqinPage.prototype.getWeeks = function (y, m) {
        var str = new Date(y + "/" + m + '/1');
        // 当前年份
        var year = str.getFullYear();
        //  获取月份第一天是周几  周日是0
        var day = str.getDay();
        // 获取当前月份的天数
        var days = new Date(year, m, 0).getDate();
        // 要减去开头的这几天
        var first = 0;
        day == 0 ? first = 1 : first = 8 - day;
        days = days - first;
        return 1 + Math.ceil(days / 7);
    };
    KaoqinPage.prototype.choose_day = function (date) {
        var _this = this;
        if (date.d > 0) {
            this.items_day = [];
            var choose_date = date.y + "/" + date.m + "/" + date.d;
            this.currentDay = date.d;
            this.currentMonth = date.m;
            this.currentYear = date.y;
            var timestamp = Date.parse(choose_date);
            var timestamp_now = timestamp / 1000;
            var timestamp_later = timestamp / 1000;
            var date_before = new Date(timestamp_now * 1000);
            var date_later = new Date(timestamp_later * 1000);
            this.kaoqinService.get_today_attendance(this.formatTime_day_start(date_before), this.formatTime_day_end(date_later), this.user.user_id).then(function (res) {
                console.log(res);
                if (res.result.res_data && res.result.res_code == 1) {
                    _this.items_day = res.result.res_data;
                    if (_this.items_day.length * 140 + 30 > 400) {
                        _this.change_divClass_height(_this.items_day.length * 140 + 30);
                    }
                    for (var _i = 0, _a = _this.items_day; _i < _a.length; _i++) {
                        var item = _a[_i];
                        if (item.check_in) {
                            _this.has_start = true;
                        }
                    }
                }
            });
        }
    };
    KaoqinPage.prototype.add_month = function () {
        var Y = this.currentDate_date.getFullYear();
        var m = this.currentDate_date.getMonth() + 1;
        var d = this.currentDate_date.getDate();
        var str = '';
        console.log(m);
        //获取下一个月有多少天
        var days = new Date(Y, m + 1, 0).getDate();
        if (d > days) {
            d = days;
        }
        m = m + 1;
        console.log(m);
        if (m <= 12) {
            str = Y + '/' + m + '/' + d;
        }
        else {
            Y = Y + 1;
            m = 1;
            str = Y + '/' + 1 + '/' + d;
        }
        this.currentDate_date = new Date(str);
        // console.log(this.currentDate_date)
        // console.log()
        this.currentDate = (this.currentDate_date.getMonth() + 1) + '月';
        this.setSchedule(new Date(str));
    };
    KaoqinPage.prototype.delete_month = function () {
        var Y = this.currentDate_date.getFullYear();
        var m = this.currentDate_date.getMonth() + 1;
        var d = this.currentDate_date.getDate();
        var str = '';
        m = m - 1;
        if (m <= 0) {
            Y = Y - 1;
            m = 12;
            str = Y + '/' + 12 + '/' + d;
        }
        else {
            str = Y + '/' + m + '/' + d;
        }
        this.currentDate_date = new Date(str);
        // console.log(this.currentDate_date)
        this.currentDate = (this.currentDate_date.getMonth() + 1) + '月';
        this.setSchedule(new Date(str));
    };
    KaoqinPage.prototype.delete_day = function () {
        var timestamp = Date.parse(this.datePipe.transform(this.currentDate_date, 'yyyy-MM-dd').replace(/-/g, '/'));
        var timestamp_now = timestamp / 1000 - 24 * 60 * 60;
        var timestamp_later = timestamp / 1000;
        var date = new Date(timestamp_now * 1000);
        this.currentDate_date = date;
        this.currentDate_day = (date.getMonth() + 1) + "月" + date.getDate() + "日";
        this.get_day_data(date);
    };
    KaoqinPage.prototype.add_day = function () {
        var timestamp = Date.parse(this.datePipe.transform(this.currentDate_date, 'yyyy-MM-dd').replace(/-/g, '/'));
        var timestamp_now = timestamp / 1000 + 24 * 60 * 60;
        var timestamp_later = timestamp / 1000;
        var date = new Date(timestamp_now * 1000);
        this.currentDate_date = date;
        this.currentDate_day = (date.getMonth() + 1) + "月" + date.getDate() + "日";
        this.get_day_data(date);
    };
    KaoqinPage.prototype.get_day_data = function (date) {
        var _this = this;
        var timestamp = Date.parse(date);
        var timestamp_now = timestamp / 1000 - 24 * 60 * 60;
        var date_later = new Date(timestamp_now * 1000);
        this.kaoqinService.get_employee_attendance(this.formatTime_day_start(date), this.formatTime_day_end(date), this.user.user_id).then(function (res) {
            if (res.result.res_data && res.result.res_code == 1) {
                _this.total_employees = res.result.res_data.total;
                _this.is_attendance = res.result.res_data.attendance_on;
            }
        });
    };
    KaoqinPage.prototype.click_un_attendance = function () {
        this.navCtrl.push('KaoqinPeoplePage', {
            manager_id: this.user.user_id,
            type: "未打卡",
            current_date: this.currentDate_date,
        });
    };
    KaoqinPage.prototype.click_attendance = function () {
        this.navCtrl.push('KaoqinPeoplePage', {
            manager_id: this.user.user_id,
            type: "已打卡",
            current_date: this.currentDate_date,
        });
    };
    KaoqinPage.prototype.showAlert = function (msg, attendance_off) {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: '提示',
            subTitle: msg,
            buttons: [
                {
                    text: '取消',
                    handler: function (data) {
                    }
                },
                {
                    text: '确定',
                    handler: function (data) {
                        _this.navCtrl.push('ChooseLocationPage', {
                            "attendance_off": attendance_off,
                        });
                    }
                }
            ]
        });
        prompt.present();
    };
    KaoqinPage.prototype.clickCancel = function () {
        this.isShowOnAlert = false;
        this.isShowOffAlert = false;
        this.isShowFail = false;
        this.isShowFail_Three = false;
    };
    KaoqinPage.prototype.click_location = function () {
        this.isShowFail_Three = false;
        this.navCtrl.push('ChooseLocationPage', {
            "attendance_off": this.attendance_off,
        });
    };
    KaoqinPage.prototype.startClick = function () {
        this.isShowActive = false;
        var that = this;
        this.ble.isEnabled().then(function () {
            var loading = that.loading.create({
                content: '签到中...',
                enableBackdropDismiss: true
            });
            var isHas = false;
            var is_kaoqin_ok = false;
            var is_ok = "no_need";
            var already_scan = false;
            loading.present();
            var list = [];
            that.ble.scan([], 5).subscribe(function (device) {
                console.log(device.name);
                isHas = false;
                var company_name = "";
                for (var _i = 0, _a = that.device_list; _i < _a.length; _i++) {
                    var item_device = _a[_i];
                    if (device.name == item_device.device_name) {
                        if (is_ok == "no_need") {
                            is_kaoqin_ok = true;
                            isHas = true;
                            is_ok = "need";
                            company_name = item_device.company_name;
                        }
                        that.ble.stopScan();
                        loading.dismiss();
                        break;
                    }
                }
                if (isHas && is_ok == "need" && is_kaoqin_ok) {
                    console.log("请求");
                    is_ok = "has_request";
                    var timestamp = Date.parse(that.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss').replace(/-/g, '/'));
                    ;
                    var timestamp_now = timestamp / 1000 - 8 * 60 * 60;
                    var date = new Date(timestamp_now * 1000);
                    var timestamp_cal = Date.parse(that.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss').replace(/-/g, '/'));
                    var timestamp_cal_now = timestamp_cal / 1000 - 24 * 60 * 60;
                    var date_cal = new Date(timestamp_cal_now * 1000);
                    var data_obj = {
                        "employee_id": that.user.user_id,
                        "check_in": that.formatTime_odoo(date),
                        "day_start": that.formatTime_day_start(new Date()),
                        "day_end": that.formatTime_day_end(new Date()),
                        "company_name": company_name,
                        "device_version": that.device.uuid,
                    };
                    that.kaoqinService.employee_attendance(data_obj).then(function (res) {
                        that.isShowActive = true;
                        if (res.result.res_data && res.result.res_code == 1) {
                            that.fail_times = 0;
                            //  Utils.toastButtom(, that.toastCtrl)
                            var timestamp_cal_1 = Date.parse(that.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss').replace(/-/g, '/'));
                            var timestamp_cal_now_1 = timestamp_cal_1 / 1000;
                            var date_cal_1 = new Date(timestamp_cal_now_1 * 1000);
                            that.show_date_str = [that.formatO(date_cal_1.getHours()), that.formatO(date_cal_1.getMinutes())].join(':');
                            that.isShowOnAlert = true;
                            var count = 0;
                            that.items = res.result.res_data;
                            if (that.items.length * 140 + 30 > 400) {
                                that.change_divClass_height(that.items.length * 140 + 30);
                            }
                            for (var _i = 0, _a = that.items; _i < _a.length; _i++) {
                                var item = _a[_i];
                                if (item.check_in) {
                                    that.has_start = true;
                                    count += 1;
                                }
                                if (item.check_out) {
                                    count += 1;
                                }
                            }
                            that.attendance_count = count;
                        }
                    });
                }
            });
            var timer = self.setTimeout(function () {
                that.isShowActive = true;
                loading.dismiss();
                that.ble.stopScan();
                if (!is_kaoqin_ok) {
                    that.fail_times = that.fail_times + 1;
                    // if(that.fail_times >= 3)
                    // {
                    //     that.isShowFail_Three = true
                    //     that.fail_str = "失败次数过多？试试位置签到"
                    //     that.attendance_off = false
                    // }
                    // else
                    // {
                    that.isShowFail = true;
                    that.fail_str = "不在签到范围";
                    // }
                }
            }, 5000);
        }, function () {
            that.isShowActive = true;
            that.isShowFail = true;
            that.fail_str = "蓝牙未打开";
        });
    };
    KaoqinPage.prototype.endClick = function () {
        this.isShowActive = false;
        var that = this;
        this.ble.isEnabled().then(function () {
            var loading = that.loading.create({
                content: '签退中...',
                enableBackdropDismiss: true
            });
            var isHas = false;
            var is_ok = "no_need";
            var is_kaoqin_ok = false;
            loading.present();
            var list = [];
            that.ble.scan([], 5).subscribe(function (device) {
                console.log(device.name);
                isHas = false;
                var company_name = "";
                console.log(that.device_list);
                for (var _i = 0, _a = that.device_list; _i < _a.length; _i++) {
                    var item_device = _a[_i];
                    if (device.name == item_device.device_name) {
                        if (is_ok == "no_need") {
                            is_kaoqin_ok = true;
                            isHas = true;
                            is_ok = "need";
                            company_name = item_device.company_name;
                        }
                        that.ble.stopScan();
                        loading.dismiss();
                        break;
                    }
                }
                if (isHas && is_ok == "need" && is_kaoqin_ok) {
                    console.log("请求");
                    is_ok = "has_request";
                    var timestamp = Date.parse(that.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss').replace(/-/g, '/'));
                    ;
                    var timestamp_now = timestamp / 1000 - 8 * 60 * 60;
                    var date = new Date(timestamp_now * 1000);
                    var timestamp_cal = Date.parse(that.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss').replace(/-/g, '/'));
                    var timestamp_cal_now = timestamp_cal / 1000 - 24 * 60 * 60;
                    var date_cal = new Date(timestamp_cal_now * 1000);
                    var data_obj = {
                        "employee_id": that.user.user_id,
                        "check_out": that.formatTime_odoo(date),
                        "day_start": that.formatTime_day_start(new Date()),
                        "day_end": that.formatTime_day_end(new Date()),
                        "attendance_off": true,
                        "company_name": company_name,
                        "device_version": that.device.uuid,
                    };
                    that.kaoqinService.employee_attendance(data_obj).then(function (res) {
                        that.isShowActive = true;
                        if (res.result.res_data && res.result.res_code == 1) {
                            that.fail_times = 0;
                            // Utils.toastButtom("签退成功", that.toastCtrl)
                            var timestamp_cal_2 = Date.parse(that.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss').replace(/-/g, '/'));
                            var timestamp_cal_now_2 = timestamp_cal_2 / 1000;
                            var date_cal_2 = new Date(timestamp_cal_now_2 * 1000);
                            that.show_date_str = [that.formatO(date_cal_2.getHours()), that.formatO(date_cal_2.getMinutes())].join(':');
                            that.isShowOffAlert = true;
                            var count = 0;
                            that.items = res.result.res_data;
                            if (that.items.length * 140 + 30 > 400) {
                                that.change_divClass_height(that.items.length * 140 + 30);
                            }
                            for (var _i = 0, _a = that.items; _i < _a.length; _i++) {
                                var item = _a[_i];
                                if (item.check_in) {
                                    that.has_start = true;
                                    count += 1;
                                }
                                if (item.check_out) {
                                    count += 1;
                                }
                            }
                            that.attendance_count = count;
                        }
                    });
                }
            });
            var timer = self.setTimeout(function () {
                that.isShowActive = true;
                loading.dismiss();
                that.ble.stopScan();
                if (!is_kaoqin_ok) {
                    that.fail_times = that.fail_times + 1;
                    // if(that.fail_times >= 3)
                    // {
                    //     that.isShowFail_Three = true
                    //     that.fail_str = "失败次数过多？试试位置签到"
                    //     that.attendance_off = true
                    // }
                    // else
                    // {
                    that.isShowFail = true;
                    that.fail_str = "不在签到范围";
                    // }
                }
            }, 5000);
        }, function () {
            that.isShowActive = true;
            that.isShowFail = true;
            that.fail_str = "蓝牙未打开";
        });
    };
    KaoqinPage.prototype.update_attendance = function (item) {
        var time = item.check_out ? item.check_out : item.check_in;
        var month_time = time.split(' ')[0].split('-')[0] + "-" + time.split(' ')[0].split('-')[1];
        this.navCtrl.push('AttendanceUpdatePage', {
            is_edit: true,
            item_data: {
                attendance_type: 0,
                attendance_work_type: item.check_out ? '下班' : '上班',
                remark: '',
                attendance_time: time,
            },
            month_time: month_time,
        });
    };
    return KaoqinPage;
}());
KaoqinPage = kaoqin___decorate([
    __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"]({
        selector: 'page-kaoqin',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/kaoqin/kaoqin.html"*/'<!--\n  Generated template for the KaoqinPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header id="header" no-border>\n\n  <ion-navbar color="gongdan-color">\n    <ion-title *ngIf="isWrite">考勤</ion-title>\n    <ion-title *ngIf="isLook && !is_show_tongji">我的</ion-title>\n    <div align="center" style="height:30px;" *ngIf="isLook && is_show_tongji">\n        <div style="width:33%;float:right;text-align:left" [ngClass]="{true:\'test_choose\',false:\'test_one\'}[show_type == \'month\']" align="center" tappable (click)="click_month()">\n        月统计\n        </div>\n        <div style="width:33%;float:right" [ngClass]="{true:\'test_choose\',false:\'test_one\'}[show_type == \'day\']" align="center" tappable (click)="click_day()">\n        日统计\n        </div>\n        <div style="width:33%;float:left;text-align:right" [ngClass]="{true:\'test_choose\',false:\'test_one\'}[show_type == \'me\']" align="center" tappable (click)="click_me()">\n        我的\n        </div> \n    </div>\n  </ion-navbar>\n  <ion-backdrop *ngIf="isShowOnAlert || isShowOffAlert" style="opacity: 0.6;">       \n  </ion-backdrop>\n</ion-header>\n\n\n<div class="backdrop-div" >\n\n    \n    \n</div>\n<ion-content style="background:#f0f2f5">\n  <ion-backdrop *ngIf="isShowOnAlert || isShowOffAlert || isShowFail || isShowFail_Three" disable-activated role="presentation" tappable style="opacity: 0.6; transition-delay: initial; transition-property: none;">       \n  </ion-backdrop>\n  <div *ngIf="isShowOnAlert" class="alert_div" style="opacity: 1.0;">\n    <div class="alert_p">\n      <div class="alert_icon_class"></div>\n      <span style="font-size: 18px;margin-top: 9px;margin-left: 5px;">打卡成功</span>\n    </div> \n    <div class="alert_center_div">\n      <h2 class="alert_h2_class">{{show_date_str}}</h2>\n      <p class="alert_p_class">上班</p>\n    </div>  \n    <div tappable (click)="clickCancel()" class="alert_btn">\n      知道了\n    </div>    \n  </div>\n  <div *ngIf="isShowOffAlert" class="alert_div_off" style="opacity: 1.0;">\n    <div class="alert_p">\n      <div class="alert_icon_class"></div>\n      <span style="font-size: 18px;margin-top: 9px;margin-left: 5px;">打卡成功</span>\n    </div>  \n    <div class="alert_center_div_off">\n      <h2 class="alert_h2_class_off">{{show_date_str}}</h2>\n      <p class="alert_p_class_off">下班</p>\n    </div>  \n    <div tappable (click)="clickCancel()" class="alert_btn">\n      知道了\n    </div>    \n  </div>\n  <div *ngIf="isShowFail" class="alert_div_fail" style="opacity: 1.0;">\n    <img style="width:110px;height:110px;margin-top:30px;" src="assets/img/fail_icon.png" />    \n    <p style="color:black;font-size:20px">签到失败</p>\n    <p style="color:gray;font-size:14px;margin-top:-16px">{{fail_str}}</p>\n    <div tappable (click)="clickCancel()" class="alert_btn_fail">\n      我知道了\n    </div>    \n  </div>\n  <div *ngIf="isShowFail_Three" class="alert_div_fail_three" style="opacity: 1.0;">\n    <img style="width:110px;height:110px;margin-top:30px;" src="assets/img/fail_icon.png" />    \n    <p style="color:black;font-size:20px">签到失败</p>\n    <p style="color:gray;font-size:14px;margin-top:-16px">{{fail_str}}</p>   \n    <div class="alert_btn_fail">\n      <!--<span style="text-align:center">我知道了</span><span style="text-align:center;color:#409eff">位置签到</span>-->\n      <div tappable (click)="clickCancel()" style="width:50%;float:left;text-align:center;color:lightgray">我知道了</div><div tappable (click)="click_location()" style="width:50%;float:right;text-align:center;color:#409eff">位置签到</div>\n    </div>    \n  </div>\n  <div *ngIf="isWrite">\n    <ion-item no-lines style="height:40px;min-height:50px;margin-top:-9px;border-bottom: #f0f2f5 1px solid;">\n    <ion-grid style="background:white">\n      <ion-row>\n        <ion-col col-2>\n          <img src={{user_ava}} class="img_message_ava">\n        </ion-col>\n        <ion-col col-7 >\n          <p *ngIf="items" class="name_message">\n            <span style="color:black">{{user_name}}</span><span style="margin-left:10px"><span>今天已打卡</span><span style="color:#1897f2">{{attendance_count}}</span><span>次</span></span>\n          </p>\n          <p *ngIf="!items" class="name_message">\n            <span style="color:black">{{user_name}}</span><span style="margin-left:10px">今天未打卡</span>\n          </p>\n        </ion-col>\n        <!--<ion-col col-3 tappable (click)="reply_to(items)">\n          <img src="assets/img/work_bench/feedback.png" class="reply_small_icon">\n        </ion-col>-->\n      </ion-row>\n    </ion-grid>\n  </ion-item>\n  <div class="header_class">\n    <div id="divClass" class="divClass">\n    </div>\n    <ul *ngFor="let item of items;let i = index">\n      <li *ngIf="item.check_out" [ngClass]="{true:\'li_class\',false:\'li_class\'}[i == 0]">\n                <span [ngClass]="{true:\'time_type_li_class\',false:\'time_type_li_class\'}[i == 0]">下班</span>\n\n        <span [ngClass]="{true:\'time_li_class\',false:\'time_li_class\'}[i == 0]">{{calcEnd(item)}}</span>\n        <span *ngIf="!item.is_location_off" class="time_company_class">{{item.company_off_name}}</span>\n        <!--<span class="time_company_class_delete_attendance" tappable (click)="update_attendance(item)">更新打卡 ></span>-->\n\n        <div *ngIf="item.is_location_off" class="time_company_class">\n          <img style="width:15px;margin-top:4px" src="assets/img/daka_location.png"/><p style=" margin-top: -20px;margin-left: 18px">{{item.company_off_name}}<p>\n        </div>\n        <ion-grid *ngIf="item.attendance_off_ids" style="margin-top:-20px;margin-left:-10px">\n          <ion-row style="margin-right:5px;">\n            <ion-col style="height:80px" *ngFor="let image of item.attendance_off_ids" col-3>\n              <img src={{image}} style="position:absolute;clip:rect(0px,70px,70px,0px);background-color:#f0f2f5" imageViewer/>\n            </ion-col>\n          </ion-row>\n        </ion-grid>\n      </li>\n      <li *ngIf="item.check_in" [ngClass]="{true:\'li_class\',false:\'li_class\'}[!item.check_out && i == 0]">\n                <span [ngClass]="{true:\'time_type_li_class\',false:\'time_type_li_class\'}[!item.check_out && i == 0]" class="">上班</span>\n\n          <span [ngClass]="{true:\'time_li_class\',false:\'time_li_class\'}[!item.check_out && i == 0]">{{calcStart(item)}}</span>\n        <span *ngIf="!item.is_location_on" class="time_company_class">{{item.company_name}}</span>\n        <!--<span class="time_company_class_delete_attendance" tappable (click)="update_attendance(item)">更新打卡 ></span>-->\n        <div *ngIf="item.is_location_on" class="time_company_class">\n          <img style="width:15px;margin-top:-5px" src="assets/img/daka_location.png"/>\n          <span style="margin-top:-6px;margin-left:-1px">{{item.company_name}}</span>\n        </div>\n        <ion-grid *ngIf="item.attendance_on_ids" style="margin-top:-5px;margin-left:-10px;">\n          <ion-row style="margin-right:5px;">\n            <ion-col style="height:80px" *ngFor="let image of item.attendance_on_ids" col-3>\n              <img src={{image}} style="position:absolute;clip:rect(0px,70px,70px,0px);background-color:#f0f2f5" imageViewer/>\n            </ion-col>\n          </ion-row>\n        </ion-grid>\n      </li>\n    </ul>\n  </div>\n  <!--<div class="buttom_divider">\n  </div>-->\n  <div class=\'buttom_div\'>\n     <div class=\'text_class\'></div> \n    <div *ngIf="isShowActive">\n      <div [ngClass]="{true:\'left_circle_inactive\',false:\'left_circle\'}[has_start]"  tappable (click)="start_work()">上班</div>\n      <div class=\'right_circle\' tappable (click)="end_work()">下班</div>\n    </div>\n    <div *ngIf="!isShowActive">\n      <div class=\'left_circle_inactive\' >上班</div>\n      <div class=\'right_circle_inactive\' >下班</div>\n    </div>\n  </div> \n  </div>\n  \n  <div *ngIf="isLook">\n    <div *ngIf="show_type == \'me\'">\n    <ion-item no-lines style="height:40px;min-height:50px;margin-top:-9px;border-bottom: #f0f2f5 1px solid;">\n    <ion-grid style="background:white">\n      <ion-row>\n        <!--<ion-col col-2>\n          <img src={{user_ava}} class="img_message_ava">\n        </ion-col>\n        <ion-col col-2 >\n          <p class="name_message">\n            <span style="color:black;font-size:12px">{{user_name}}</span>\n          </p>\n        </ion-col>-->\n        <ion-col col-3 >\n          <p class="chidao_class">\n            <span class="circleOrangeBig">\n              \n            </span>\n            <span style="color:black;font-size:14px">迟到{{attendance_data.calc_late.length}}次</span>\n          </p>\n        </ion-col>\n        <ion-col col-7 >\n          <p class="queqin_class">\n            <span class="circleRedBig">\n              \n            </span>\n            <span style="color:black;font-size:14px">缺勤{{attendance_data.lose_work_day}}h</span>\n          </p>\n        </ion-col>\n        <ion-col col-3>\n          <p class="month_message">\n            <span tappable (click)="delete_month()">{{"<"}}</span><span style="margin-left:10px">{{currentDate}}</span><span style="margin-left:10px" tappable (click)="add_month()">{{">"}}</span>\n          </p>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </ion-item>\n  <div class="box-flex" >  \n    \n      <div class="flex-item">  \n        <div class="item-content-header">一</div>  \n      </div>  \n      <div class="flex-item">  \n        <div class="item-content-header">二</div>  \n      </div>  \n      <div class="flex-item">  \n        <div class="item-content-header">三</div>  \n      </div>  \n      <div class="flex-item">  \n        <div class="item-content-header">四</div>  \n      </div>  \n      <div class="flex-item">  \n        <div class="item-content-header">五</div>  \n      </div>  \n      <div class="flex-item">  \n        <div class="item-content-header">六</div>  \n      </div>  \n       <div class="flex-item">  \n        <div class="item-content-header">日</div>  \n      </div> \n    </div>\n    <div class="box-flex" style=\'margin-top:-20px;padding-bottom: 10px;\'>  <!--style=\'border:#dedede 1px solid;background-color:#f9f9f9\' -->\n      <div id= "flex-item" align=\'center\' class="flex-item" *ngFor="let vo of currentDayList">  \n        <!--<div class="item-content bk-color-day"  style=\'line-height:30px\'>{{vo.d}}\n          </div>  -->\n        <div id="item-content" tappable (click)="choose_day(vo)" [ngClass]="{true:\'item-content bk-color-day\',false:\'item-content\'}[currentDay == vo.d && currentMonth == vo.m && currentYear == vo.y]" style="line-height:38px;height:48px;width:48px;">\n            <p style="height: 16px;margin-top: -3px;margin-left: -1px;" [ngClass]="{\'pBac\':currentMonth == vo.m && currentYear == vo.y,\'pBacNormal\':currentMonth != vo.m,\'pNormal\':currentDay == vo.d && currentMonth == vo.m && currentYear == vo.y}">{{vo.d}}</p>\n                    <p *ngIf=\'vo.d > 0\' style="margin-top: -15px;">\n                      <span *ngIf=\'vo.is_queqin\' class="circleRed">\n                      </span>\n                      <span *ngIf=\'vo.is_late\' class="circleOrange">\n                      </span>\n                      <span *ngIf=\'!vo.is_late && !vo.is_queqin\' class="circleWhite">\n                      </span>\n            </p>\n        </div>      \n        \n      </div> \n    </div>\n    <!--<div class=\'buttom_divider\'>\n    </div>  -->\n    <div style="background:black;width:100%;height:100%">\n      <div class="bottom_class">\n    <div id="divClass" class="divClass">\n    </div>\n    <ul *ngFor="let item of items_day">\n      <li *ngIf="item.check_out" [ngClass]="{true:\'li_class\',false:\'li_class\'}[i == 0]">\n        <span [ngClass]="{true:\'time_type_li_class\',false:\'time_type_li_class\'}[i == 0]">下班</span>\n        <span [ngClass]="{true:\'time_li_class\',false:\'time_li_class\'}[i == 0]">{{calcEnd(item)}}</span>\n        <span *ngIf="!item.is_location_off" class="time_company_class">{{item.company_off_name}}</span>\n        <!--<span class="time_company_class_delete_attendance" tappable (click)="update_attendance(item)">更新打卡 ></span>-->\n\n        <div *ngIf="item.is_location_off" class="time_company_class">\n          <img style="width:15px;margin-top:4px" src="assets/img/daka_location.png"/><p style=" margin-top: -20px;margin-left: 18px">{{item.company_off_name}}<p>\n        </div>\n        <ion-grid *ngIf="item.attendance_off_ids" style="margin-top:-20px;margin-left:-10px">\n          <ion-row style="margin-right:5px;">\n            <ion-col style="height:80px" *ngFor="let image of item.attendance_off_ids" col-3>\n              <img src={{image}} style="position:absolute;clip:rect(0px,70px,70px,0px);background-color:#f0f2f5" imageViewer/>\n            </ion-col>\n          </ion-row>\n        </ion-grid>\n      </li>\n      <li *ngIf="item.check_in" [ngClass]="{true:\'li_class\',false:\'li_class\'}[!item.check_out && i == 0]">\n            <span [ngClass]="{true:\'time_type_li_class\',false:\'time_type_li_class\'}[!item.check_out && i == 0]" class="">上班</span>\n          <span [ngClass]="{true:\'time_li_class\',false:\'time_li_class\'}[!item.check_out && i == 0]">{{calcStart(item)}}</span>\n        <span *ngIf="!item.is_location_on" class="time_company_class">{{item.company_name}}</span>\n        <!--<span class="time_company_class_delete_attendance" tappable (click)="update_attendance(item)">更新打卡 ></span>-->\n\n        <div *ngIf="item.is_location_on" class="time_company_class">\n          <img style="width:15px;margin-top:-5px" src="assets/img/daka_location.png"/>\n          <span style="margin-top:-6px;margin-left:-1px">{{item.company_name}}</span>\n        </div>\n        <ion-grid *ngIf="item.attendance_on_ids" style="margin-top:-5px;margin-left:-10px;">\n          <ion-row style="margin-right:5px;">\n            <ion-col style="height:80px" *ngFor="let image of item.attendance_on_ids" col-3>\n              <img src={{image}} style="position:absolute;clip:rect(0px,70px,70px,0px);background-color:#f0f2f5" imageViewer/>\n            </ion-col>\n          </ion-row>\n        </ion-grid>\n      </li>\n    </ul>\n  </div>\n    </div>\n    </div>\n    <div *ngIf="show_type == \'day\'">\n      <ion-item no-lines style="height:40px;min-height:50px;margin-top:-9px;border-bottom: #f0f2f5 1px solid;">\n    <ion-grid style="background:white">\n      <ion-row>\n        <ion-col col-7 >\n          <p class="name_message">\n            <span style="color:black;margin-left:20px">考勤人数 {{total_employees}} 人</span>\n          </p>\n        </ion-col>\n        <ion-col col-2>\n          <!--<img src={{user_ava}} class="img_message_ava">-->\n        </ion-col>\n        <ion-col col-3>\n          <p class="month_message">\n            <span tappable (click)="delete_day()">{{"<"}}</span><span style="margin-left:10px">{{currentDate_day}}</span><span style="margin-left:10px" tappable (click)="add_day()">{{">"}}</span>\n          </p>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </ion-item>\n    <div style=\'width:100%;height:120px;background:white\'>\n      <div style=\'width:50%;height:100%;float:left\' tappable (click)="click_un_attendance()">\n        <div style=\'width:100%;text-align:center;font-size:30px;color:#1897f2;margin-top:25px\'>\n          {{total_employees - is_attendance}}\n        </div>\n        <div style=\'width:100%;text-align:center;color:#c2c7cc\'>\n          未打卡\n        </div>\n        <div class=\'day_divClass\'>\n        </div>\n      </div>\n      <div style=\'width:50%;height:100%;float:right\' tappable (click)="click_attendance()">\n         <div style=\'width:100%;text-align:center;font-size:30px;color:#5c6166;margin-top:25px\'>\n          {{is_attendance}}\n        </div>\n        <div style=\'width:100%;text-align:center;color:#c2c7cc\'>\n          已打卡\n        </div>\n      </div>\n    </div> \n    </div>\n</div>\n\n\n\n</ion-content>\n\n<ion-footer id="footer">\n  <ion-backdrop *ngIf="isShowOnAlert || isShowOffAlert" style="opacity: 0.6;">       \n  </ion-backdrop>\n    <div style="background:#f8f8f8;height:53px;border-top: 0.55px solid rgba(0, 0, 0, 0.3)">\n<ion-grid>\n    <ion-row style="text-align:center;height:50px">\n      <ion-col col-6 style="display:flex; align-items:center" tappable (click)="chooseWrite()">\n      <div style="margin-left: auto;margin-right: auto;">\n          <img src={{writeImg}} style="width:25px;height:25px;margin-bottom:3px;margin-top:-4px">\n          <p text-wrap [ngClass]="{true:\'textcolor1\',false:\'textcolor_normal\'}[isWrite]">打卡</p>\n      </div>\n      </ion-col>\n      <ion-col col-6 style="display:flex; align-items:center" tappable (click)="chooseLook()">\n      <div style="margin-left: auto;margin-right: auto;">\n        <img src={{lookImg}} style="width:25px;height:25px;margin-bottom:3px;margin-top:-4px">\n          <p text-wrap [ngClass]="{true:\'textcolor1\',false:\'textcolor_normal\'}[isLook]">统计</p>\n      </div>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</div>\n\n</ion-footer>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/kaoqin/kaoqin.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_3__kaoqinService__["a" /* KaoQinService */], __WEBPACK_IMPORTED_MODULE_4__angular_common__["DatePipe"], BLE, __WEBPACK_IMPORTED_MODULE_6__ionic_native_device__["a" /* Device */]],
    }),
    kaoqin___metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["x" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_3__kaoqinService__["a" /* KaoQinService */], __WEBPACK_IMPORTED_MODULE_4__angular_common__["DatePipe"], BLE,
        __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["E" /* ToastController */], __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["t" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"],
        __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["z" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_6__ionic_native_device__["a" /* Device */]])
], KaoqinPage);

//# sourceMappingURL=kaoqin.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/kaoqin/kaoqin.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KaoqinPageModule", function() { return KaoqinPageModule; });
/* harmony import */ var kaoqin_module___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_img_viewer__ = __webpack_require__(244);
var kaoqin_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var KaoqinPageModule = (function () {
    function KaoqinPageModule() {
    }
    return KaoqinPageModule;
}());
KaoqinPageModule = kaoqin_module___decorate([
    kaoqin_module___WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            KaoqinPage,
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(KaoqinPage), __WEBPACK_IMPORTED_MODULE_3_ionic_img_viewer__["a" /* IonicImageViewerModule */]
        ],
    })
], KaoqinPageModule);

//# sourceMappingURL=kaoqin.module.js.map

/***/ }),

/***/ 752:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KaoQinService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var KaoQinService = (function () {
    function KaoQinService(httpservice) {
        this.httpservice = httpservice;
    }
    KaoQinService.prototype.get_today_attendance = function (day_start, day_end, user_id) {
        var body = JSON.stringify({
            day_start: day_start,
            day_end: day_end,
            user_id: user_id,
        });
        return this.httpservice.postBody("get_today_attendance", body);
    };
    KaoQinService.prototype.employee_attendance = function (data_params) {
        var body = JSON.stringify(data_params);
        return this.httpservice.postBodyNoLoading("employee_attendance", body);
    };
    KaoQinService.prototype.get_ble_device = function () {
        var body = JSON.stringify({});
        return this.httpservice.postBodyNoLoading("get_ble_device", body);
    };
    KaoQinService.prototype.get_employee_attendance = function (day_start, day_end, user_id) {
        var body = JSON.stringify({
            day_start: day_start,
            day_end: day_end,
            user_id: user_id,
        });
        return this.httpservice.postBodyNoLoading("get_employee_attendance", body);
    };
    KaoQinService.prototype.get_is_department = function (employee_id) {
        var body = JSON.stringify({
            employee_id: employee_id,
        });
        return this.httpservice.postBodyNoLoading("get_is_department", body);
    };
    KaoQinService.prototype.get_department_employee_attendance = function (manager_id, day_start, day_end) {
        var body = JSON.stringify({
            manager_id: manager_id,
            day_start: day_start,
            day_end: day_end,
        });
        return this.httpservice.postBody("get_department_employee_attendance", body);
    };
    KaoQinService.prototype.trans_location = function (latitude, longti) {
        var url_str = "http://api.map.baidu.com/geoconv/v1/?coords=" + longti + "," + latitude + "&from=1&to=5&ak=cVef1ROo1IR5OkZ5Fly78vDuOoGmLmD7";
        return this.httpservice.getWithUrl(url_str);
    };
    KaoQinService.prototype.get_location_now = function (latitude, longti) {
        var url_str = "http://api.map.baidu.com/geocoder/v2/?callback=renderReverse&location=" + latitude + "," + longti + "&output=json&pois=1&ak=cVef1ROo1IR5OkZ5Fly78vDuOoGmLmD7";
        return this.httpservice.getLocationWithUrl(url_str);
    };
    KaoQinService.prototype.location_attendance = function (data_params) {
        var body = JSON.stringify(data_params);
        return this.httpservice.postBody("location_attendance", body);
    };
    KaoQinService.prototype.get_month_attendance = function (month_str, user_id) {
        var body = JSON.stringify({
            month_str: month_str,
            user_id: user_id,
        });
        return this.httpservice.postBody("get_month_attendance", body);
    };
    return KaoQinService;
}());
KaoQinService = __decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"](),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */]])
], KaoQinService);

//# sourceMappingURL=kaoqinService.js.map

/***/ }),

/***/ 898:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Device; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__ = __webpack_require__(12);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * @name Device
 * @description
 * Access information about the underlying device and platform.
 *
 * @usage
 * ```typescript
 * import { Device } from '@ionic-native/device';
 *
 * constructor(private device: Device) { }
 *
 * ...
 *
 * console.log('Device UUID is: ' + this.device.uuid);
 * ```
 */
var Device = (function (_super) {
    __extends(Device, _super);
    function Device() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Device.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"] },
    ];
    /** @nocollapse */
    Device.ctorParameters = function () { return []; };
    __decorate([
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["d" /* CordovaProperty */],
        __metadata("design:type", String)
    ], Device.prototype, "cordova", void 0);
    __decorate([
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["d" /* CordovaProperty */],
        __metadata("design:type", String)
    ], Device.prototype, "model", void 0);
    __decorate([
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["d" /* CordovaProperty */],
        __metadata("design:type", String)
    ], Device.prototype, "platform", void 0);
    __decorate([
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["d" /* CordovaProperty */],
        __metadata("design:type", String)
    ], Device.prototype, "uuid", void 0);
    __decorate([
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["d" /* CordovaProperty */],
        __metadata("design:type", String)
    ], Device.prototype, "version", void 0);
    __decorate([
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["d" /* CordovaProperty */],
        __metadata("design:type", String)
    ], Device.prototype, "manufacturer", void 0);
    __decorate([
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["d" /* CordovaProperty */],
        __metadata("design:type", Boolean)
    ], Device.prototype, "isVirtual", void 0);
    __decorate([
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["d" /* CordovaProperty */],
        __metadata("design:type", String)
    ], Device.prototype, "serial", void 0);
    Device = __decorate([
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["h" /* Plugin */]({
            pluginName: 'Device',
            plugin: 'cordova-plugin-device',
            pluginRef: 'device',
            repo: 'https://github.com/apache/cordova-plugin-device',
            platforms: ['Android', 'Browser', 'iOS', 'macOS', 'Windows']
        })
    ], Device);
    return Device;
}(__WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["g" /* IonicNativePlugin */]));

//# sourceMappingURL=index.js.map

/***/ })

});
//# sourceMappingURL=24.js.map