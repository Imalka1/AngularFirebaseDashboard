import {Component, OnInit, ViewChild} from '@angular/core';
import {DashboardService} from "./dashboard.service";
import {User} from "../model/User";
import {Message} from "../model/Message";
import {DatePipe} from "@angular/common";
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
};

declare var Morris: any

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild("chart", {static: false}) chart: ChartComponent;
  public chartOptions;

  users = new Array<User>();
  user = new User();
  messages = new Array();
  message = new Message();

  chartBars = [0, 0, 0, 0, 0, 0]

  constructor(private dashboardService: DashboardService, private datePipe: DatePipe) {
    this.chartOptions = {
      series: [
        {
          name: "basic",
          data: this.chartBars
        }
      ],
      chart: {
        type: "bar",
        height: 300
      },
      plotOptions: {
        bar: {
          horizontal: false,
          distributed: true,
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: [
          "",
          "",
          "",
          "",
          "",
          ""
        ]
      },
      colors: ['#f1e100', '#ffc008', '#ff8c06', '#ff1900', '#d26402', '#943c05'],
    };
  }

  ngOnInit() {
    window.scroll(0, 0);
    this.getUserRequests()
  }

  getUserRequests() {
    this.dashboardService.getUserRequests().subscribe((values => {
      this.chartBars = [0, 0, 0, 0, 0, 0]
      this.messages = new Array();
      this.users = values.map(item => {
        let user = new User();
        user.id = item.payload.doc.id
        user.address = item.payload.doc.data()['address']
        user.email = item.payload.doc.data()['email']
        user.name = item.payload.doc.data()['name']
        user.nic = item.payload.doc.data()['nic']
        user.accVerify = item.payload.doc.data()['accVerify']

        if (user.accVerify) {
          this.getCrimes(user.id)
        }
        return user;
      });
    }))
  }

  getCrimes(id) {
    this.dashboardService.getCrimes(id).subscribe((values => {
      this.updateDataSet(id)
      values.map(item => {
        let message = new Message();
        message.userId = id
        message.id = item.payload.doc.id
        message.category = item.payload.doc.data()['category'].trim()
        message.details = item.payload.doc.data()['details']
        message.location = item.payload.doc.data()['location']
        if (item.payload.doc.data()['images'] != undefined) {
          for (let i = 0; i < Object.keys(item.payload.doc.data()['images']).length; i++) {
            message.images.push(item.payload.doc.data()['images']['image' + (i + 1)])
          }
        }
        if (item.payload.doc.data()['msgVerify']) {
          message.msgVerify = 'Verified'
        } else {
          message.msgVerify = 'Not Verified'
        }
        let messageTime = item.payload.doc.data()['time'].split(' ')
        message.time = messageTime[0] + ' / ' + messageTime[1]

        if (this.datePipe.transform(new Date(), 'yyyy-MM-dd') === messageTime[0]) {
          if (message.category === 'Robberies') {
            this.chartBars[0]++
          } else if (message.category === 'Murders') {
            this.chartBars[1]++
          } else if (message.category === 'Hit & Run') {
            this.chartBars[2]++
          } else if (message.category === 'Sexual Crimes') {
            this.chartBars[3]++
          } else if (message.category === 'Cyber Crimes') {
            this.chartBars[4]++
          } else if (message.category === 'Corruption') {
            this.chartBars[5]++
          }
        }

        this.chartOptions.series = [{
          data: this.chartBars
        }];

        this.messages.push(message)
      })
    }))
  }

  confirmUser(user) {
    if (!this.user.accVerify) {
      this.messages = new Array();
    }
    this.dashboardService.confirmUser(user.id)
  }

  cancelUser(user) {
    this.updateDataSet(user.id)
    this.chartBars = [0, 0, 0, 0, 0, 0]
    this.dashboardService.cancelUser(user.id)
  }

  verifyMessage(verify) {
    let ver;
    if (verify) {
      ver = 'Verified'
    } else {
      ver = 'Not Verified'
    }
    if (ver !== this.message.msgVerify) {
      this.updateDataSet(this.message.userId)
    }
    this.dashboardService.verifyMessage(this.message, verify)
  }

  setUser(user) {
    this.user = user;
  }

  setMessage(message) {
    this.message = message
  }

  updateDataSet(userId) {
    for (let i = this.messages.length - 1; i >= 0; i--) {

      if (userId === this.messages[i].userId) {
        if (this.messages[i].category === 'Robberies' && this.chartBars[0] > 0) {
          this.chartBars[0]--
        } else if (this.messages[i].category === 'Murders' && this.chartBars[1] > 0) {
          this.chartBars[1]--
        } else if (this.messages[i].category === 'Hit & Run' && this.chartBars[2] > 0) {
          this.chartBars[2]--
        } else if (this.messages[i].category === 'Sexual Crimes' && this.chartBars[3] > 0) {
          this.chartBars[3]--
        } else if (this.messages[i].category === 'Cyber Crimes' && this.chartBars[4] > 0) {
          this.chartBars[4]--
        } else if (this.messages[i].category === 'Corruption' && this.chartBars[5] > 0) {
          this.chartBars[5]--
        }

        this.messages.splice(i, 1)
      }
    }
  }
}
