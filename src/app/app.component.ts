import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { DataService } from './data.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface UserData {
  id: string;
  userId: string;
  title: string;
  body: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  title = 'mat-data';
  displayedColumn: string[] = ['id', 'userId', 'title', 'body'];
  dataSource!: MatTableDataSource<UserData>;
  posts: any;
  constructor(private dataSrv: DataService) {}

  ngAfterViewInit() {
    this.dataSrv.getData().subscribe((res) => {
      console.log(res);
      this.posts = res;
      this.dataSource = new MatTableDataSource(this.posts);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase()

    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage()
    }
  }
}
