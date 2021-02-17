import {Component, ElementRef, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ParseService} from "../shared/service/parse.service";
import {FilterInterface} from "../shared/interface/Filter.interface";
import {MaterialService} from "../shared/classes/material.service";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})

export class FilterComponent implements OnInit, AfterViewInit {
  @ViewChild('select') selectRef: ElementRef
  @ViewChild('select2') select2Ref: ElementRef
  form: FormGroup
  formFilter: FormGroup
  fields: FilterInterface = {
    url: null,
    page: null,
    items: []
  } as unknown as FilterInterface
  fieldsData: FilterInterface = {
    url: null,
    page: null,
    items: []
  } as unknown as FilterInterface
  tags = ['a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'div', 'li', 'span']
  parseData: any[]
  preloader: boolean
  constructor(private parseService: ParseService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      url: new FormControl(this.fields.url, [Validators["required"]]),
      page: new FormControl(this.fields.page)
    });
    this.formFilter = new FormGroup({
      name: new FormControl(null, [Validators["required"]]),
      tag: new FormControl(null, [Validators["required"]]),
      selector: new FormControl(null, [Validators["required"]]),
      option: new FormControl(null),
    });
  }
  ngAfterViewInit() {
    MaterialService.initializeFormSelect(this.selectRef)
    MaterialService.initializeFormSelect(this.select2Ref)
  }

  onSubmit(): void {
    this.fields.items.push(this.formFilter.value)
  }
  removeField(i: number) {
    this.fields.items.splice(i, 1)
  }
  request() {
    this.preloader = true
    this.fieldsData.items = []
    this.fields.url = this.form.value.url
    this.fields.page = this.form.value.page
    this.parseService.postParseData(this.fields).subscribe(
      (res) => {
        this.fields.items.forEach(item => this.fieldsData.items.push(item))
        this.preloader = false
        this.parseData = res
      },
      error => {
        this.preloader = false
        new Error(error)
      }
    )
  }
}
