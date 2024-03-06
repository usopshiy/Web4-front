import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {UserService} from "../../services/user.service";
import {NgForOf, NgIf} from "@angular/common";
import {Point} from "../../interfaces/point";
import {Router, RouterLink} from "@angular/router";
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    NgForOf,
    RouterLink
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements AfterViewInit{
  value_r : number = 1;
  value_x: number = 0;
  user = "";
  canvas: HTMLCanvasElement;
  private ctx : CanvasRenderingContext2D;
  constructor(private fb: FormBuilder,
              private userService: UserService,
              private apiService: ApiService,
              private router: Router) {
  }
  ngOnInit() {
    this.user = this.userService.user;
    if (this.user !== "") {
      this.getPoints(this.user);
    }
  }

  ngAfterViewInit() {
    this.canvas = <HTMLCanvasElement> document.getElementById("graph");
    this.ctx = this.canvas.getContext("2d");
    this.draw(1);
  }

  results: Point[] = [];

  sendPoint(x: string, y: string): void {

    const point: Point = {
      x: x,
      y: y,
      r: this.value_r.toString(),
      isHit: null,
      email: this.user
    }

    console.log(point);
    this.apiService.sendPoint(point).subscribe(response =>
    {
      console.log(response)
      if(!(response === "false")){this.results = <Point[]> response;}
      this.draw(this.value_r);
    }
    )
  }

  clearPoints(): void {

    this.apiService.clearPoints(this.user).subscribe(response =>
    {
      if(response === "true") {this.results = [];
        this.draw(this.value_r);
      }
      else {alert("clear failed");}
    })
  }

  logOut(): void {
    this.userService.user = "";
    this.router.navigate(['login']);
  }
  setX(e:MouseEvent, x: number){
    this.value_x = x;
  }

  setR(e: MouseEvent, r:number) {
    this.value_r = r;
  }

  getPoints(email: string): void {
    this.apiService.getPoints(email).subscribe(response => {
      this.results = <Point[]> response;
    })
  }

  pointForm = this.fb.group({
    x: [" ", [Validators.required]],
    y: ["", [Validators.required,
      Validators.pattern(/^-?\d+(\.\d+)?$/),
      Validators.min(-3),
      Validators.max(5)]],
    r: [" ", [Validators.required]]
  })

  clickPoint(e: MouseEvent) {
    let loc:{x:number, y:number} = this.windowToCanvas(this.canvas, e.clientX, e.clientY);
    console.log(loc.x, loc.y, this.value_r);
    let rly_x:number = this.value_r*((loc.x - 250)/200)
    let rly_y:number = (-1) * this.value_r*((loc.y - 250)/200)
    console.log(rly_x, rly_y);
    if(rly_x < -3 || rly_y < -3 || rly_x > 5 || rly_y > 5) {
      alert("coordinates out of range")
    } else{this.sendPoint(rly_x.toString(), rly_y.toString())}
  };
  get x() {
    return this.pointForm.controls['x']
  }

  get y() {
    return this.pointForm.controls['y']
  }

  get r() {
    return this.pointForm.controls['r']
  }

  windowToCanvas(canvas : HTMLCanvasElement, x : number, y : number) : {x: number, y : number} {
    let bbox: DOMRect = canvas.getBoundingClientRect();
    return {
      x: x - bbox.left * (canvas.width / bbox.width),
      y: y - bbox.top * (canvas.height / bbox.height)
    };
  }

  drawPoint(x : number, y : number, r : number, res : boolean) : void {
      this.ctx.beginPath();
      if (String(res) === "true") {
        this.ctx.fillStyle = "rgba(0, 255, 0, 1)";
      }else{
        this.ctx.fillStyle = "rgba(255, 0, 0, 1)";
      }

      this.ctx.arc(250 + 200 * x / r, 250 - 200 * y/r, 3, 0, 2 * Math.PI);
      this.ctx.closePath();
      this.ctx.fill();
  }

  draw(flag_draw : number) : void{

    this.set_r_value(flag_draw)

    this.ctx.clearRect(0, 0, 500, 500);

    this.ctx.fillStyle = "rgba(91,95,201,1)";
    this.ctx.beginPath();
    this.ctx.moveTo(250, 250);
    this.ctx.arc(250, 250, 200,Math.PI*3/2, 2*Math.PI, false);
    this.ctx.fillRect(250, 250, -200, 200);
    this.ctx.moveTo(250,250);
    this.ctx.lineTo(350,250);
    this.ctx.lineTo(250,450);
    this.ctx.fill();

    this.ctx.fillStyle = "rgba(0,0,0,1)";
    this.ctx.beginPath();
    this.ctx.moveTo(30,250);
    this.ctx.lineTo(470,250);

    this.ctx.lineTo(465,255);
    this.ctx.moveTo(470,250);
    this.ctx.lineTo(465,245);
    this.ctx.font = "20px serif";
    this.ctx.fillText('X',470,245);

    this.ctx.moveTo(250,470);
    this.ctx.lineTo(250,30);

    this.ctx.lineTo(255,35);
    this.ctx.moveTo(250,30);
    this.ctx.lineTo(245,35);

    this.ctx.fillText('Y',255,35);

    this.ctx.moveTo(450,260);
    this.ctx.lineTo(450,240);
    this.ctx.fillText("R" ,445,230);

    this.ctx.moveTo(350,260);
    this.ctx.lineTo(350,240);
    this.ctx.fillText("R/2" ,345,230);

    this.ctx.moveTo(50,260);
    this.ctx.lineTo(50,240);
    this.ctx.fillText("-R" ,55,230);

    this.ctx.moveTo(150,260);
    this.ctx.lineTo(150,240);
    this.ctx.fillText("-R/2",145,230);

    this.ctx.moveTo(240,50);
    this.ctx.lineTo(260,50);
    this.ctx.fillText("R" ,260,60);

    this.ctx.moveTo(240,150);
    this.ctx.lineTo(260,150);
    this.ctx.fillText("R/2" ,260,160);

    this.ctx.moveTo(240,450);
    this.ctx.lineTo(260,450);
    this.ctx.fillText("-R",260,460);

    this.ctx.moveTo(240,350);
    this.ctx.lineTo(260,350);
    this.ctx.fillText("-R/2" ,260,360);

    this.ctx.closePath();
    this.ctx.stroke();

    this.checkTableAndDraw()
  }

  checkTableAndDraw() : void{
    let n = this.results.length;
      for(let i : number = 0; i < n; i++){
        this.drawPoint(parseFloat(this.results[i].x),
          parseFloat(this.results[i].y),
          parseFloat(this.results[i].r),
          this.results[i].isHit);
    }
  }

  set_r_value(flag_draw : number) : void{
    if(flag_draw == 1){
      if(this.value_r == 100) {this.value_r = 1;}
    }
  }
}
