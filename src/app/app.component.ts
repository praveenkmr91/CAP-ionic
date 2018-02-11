import { Component, ViewChild } from "@angular/core";
import { Nav, Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { AlertsListPage } from "../pages/alerts/alerts-list/alerts-list";
import { CoinsListPage } from "../pages/coins/coins-list/coins-list";
import { PortfolioListPage } from "../pages/portfolio/portfolio-list/portfolio-list";
import { SettingsPage } from "../pages/settings/settings";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = AlertsListPage;

  pages: Array<{ title: string; component: any; icon: string }>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      {
        title: "My Portfolio",
        component: PortfolioListPage,
        icon: "briefcase"
      },
      {
        title: "My Alerts",
        component: AlertsListPage,
        icon: "bell"
      },
      {
        title: "All Coins",
        component: CoinsListPage,
        icon: "btc"
      },
      {
        title: "Settings",
        component: SettingsPage,
        icon: "cog"
      }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      if (this.platform.is("cordova")) {
        this.statusBar.styleDefault();
        this.splashScreen.hide();
      }
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
