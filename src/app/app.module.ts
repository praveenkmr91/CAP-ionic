import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { HttpModule } from "@angular/http";
import { IonicStorageModule } from "@ionic/storage";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

// plugins
import { FaIconComponent } from "../components/fa-icon/fa-icon.component";
import { LongPressModule } from "ionic-long-press";
import { LocalNotifications } from "@ionic-native/local-notifications";
import { Vibration } from "@ionic-native/vibration";
import { BackgroundMode } from "@ionic-native/background-mode";
import { FingerprintAIO } from "@ionic-native/fingerprint-aio";

// pages
import { MyApp } from "./app.component";
import { CoinsListPage } from "../pages/coins/coins-list/coins-list";
import { CoinDetailPage } from "../pages/coins/coin-detail/coin-detail";
import { AlertsListPage } from "../pages/alerts/alerts-list/alerts-list";
import { AlertAddPage } from "../pages/alerts/alert-add/alert-add";
import { PortfolioListPage } from "../pages/portfolio/portfolio-list/portfolio-list";
import { SettingsPage } from "../pages/settings/settings";

// providers
import { CoinsDataProvider } from "../providers/coins-data/coins-data";
import { AlertsDataProvider } from "../providers/alerts-data/alerts-data";

import { AppUtility } from "../shared/utils/app-utility/app-utility";
import { AppConfigs } from "../shared/configs/app-configs/app-configs";

@NgModule({
  declarations: [
    MyApp,
    FaIconComponent,
    PortfolioListPage,
    CoinsListPage,
    CoinDetailPage,
    AlertsListPage,
    AlertAddPage,
    SettingsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    LongPressModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PortfolioListPage,
    CoinsListPage,
    CoinDetailPage,
    AlertsListPage,
    AlertAddPage,
    SettingsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    LocalNotifications,
    Vibration,
    BackgroundMode,
    FingerprintAIO,
    CoinsDataProvider,
    AlertsDataProvider,
    AppUtility,
    AppConfigs
  ]
})
export class AppModule {}
