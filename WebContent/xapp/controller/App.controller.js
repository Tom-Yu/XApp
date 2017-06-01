sap.ui
		.define(
				[ 'sap/m/MessageToast', 'sap/ui/core/Fragment',
						"sap/ui/core/mvc/Controller",
						"sap/ui/model/json/JSONModel" ],
				function(MessageToast, Fragment, Controller, JSONModel) {
					"use strict";

					return sap.ui
							.controller(
									"xapp.controller.App",
									{

										/**
										 * Called when a controller is
										 * instantiated and its View controls
										 * (if available) are already created.
										 * Can be used to modify the View before
										 * it is displayed, to bind event
										 * handlers and do other one-time
										 * initialization.
										 * 
										 * @memberOf xapp.App
										 */
										onInit : function() {
											// var sServiceUrl = "http://services.odata.org/V4/Northwind/Northwind.svc/Customers/";
											// var sServiceUrl =
											// "proxy/http/services.odata.org/V4/Northwind/Northwind.svc/";
											// var oModel = new
											// sap.ui.model.odata.ODataModel(sServiceUrl);

											var sServiceUrl = "proxy/http/services.odata.org/V2/Northwind/Northwind.svc/";
											var oModel = new sap.ui.model.odata.v2.ODataModel(
													sServiceUrl);

											this.getView().setModel(oModel);

											this
													.byId("openMenu")
													.attachBrowserEvent(
															"tab keyup",
															function(oEvent) {
																this._bKeyboard = (oEvent.type == "keyup");
															}, this);
										},
										handlePressOpenMenu : function(oEvent) {
											var oButton = oEvent.getSource();
											if (!this._menu) {
												this._menu = sap.ui
														.xmlfragment(
																"xapp.view.MenuItemEventing",
																this);
												this.getView().addDependent(
														this._menu);
											}
											var eDock = sap.ui.core.Popup.Dock;
											this._menu.open(this._bKeyboard,
													oButton, eDock.BeginTop,
													eDock.BeginBottom, oButton);
										},

										handleMenuItemPress : function(oEvent) {
											var msg = "'"
													+ oEvent.getParameter(
															"item").getText()
													+ "' pressed";
											MessageToast.show(msg);
										},

										handleTextFieldItemPress : function(
												oEvent) {
											var msg = "'"
													+ oEvent.getParameter(
															"item").getValue()
													+ "' entered";
											MessageToast.show(msg);
										}

									/**
									 * Similar to onAfterRendering, but this
									 * hook is invoked before the controller's
									 * View is re-rendered (NOT before the first
									 * rendering! onInit() is used for that
									 * one!).
									 * 
									 * @memberOf xapp.App
									 */
									// onBeforeRendering: function() {
									//
									// },
									/**
									 * Called when the View has been rendered
									 * (so its HTML is part of the document).
									 * Post-rendering manipulations of the HTML
									 * could be done here. This hook is the same
									 * one that SAPUI5 controls get after being
									 * rendered.
									 * 
									 * @memberOf xapp.App
									 */
									// onAfterRendering: function() {
									//
									// },
									/**
									 * Called when the Controller is destroyed.
									 * Use this one to free resources and
									 * finalize activities.
									 * 
									 * @memberOf xapp.App
									 */
									// onExit: function() {
									//
									// }
									});
				});