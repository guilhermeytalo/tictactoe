import { Component, Input, OnInit } from '@angular/core';
import { CellEnum } from '../CellEnum';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit {

  @Input() public piece: CellEnum = CellEnum.EMPITY;
  @Input() public row: number;
  @Input() public col: number;

  constructor() { }

  ngOnInit(): void {
  }

}
