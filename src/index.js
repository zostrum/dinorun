import AppService from "./modules/app.service"
import {config} from "./modules/config"
import "./modules/header.component"

var service = new AppService('lol-kek');
service.log();