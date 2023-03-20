import { Component, EventEmitter, Input, Output } from '@angular/core';
import axios from 'axios';
import { Category } from 'src/models/category.model';
import { GlobalVariable } from '../global-variable';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  categories: Category[]
  activeCategory = ''

  @Output() activeCategoryEvent = new EventEmitter<string>();
  @Input() productsCount = 0

  ngOnInit() {
    this.getCategories()
  }

  getCategories() {
    axios.get(GlobalVariable.apiUrl+'categories').then(res => {
      this.categories = res.data
    })
  }

  setActiveCategory(activeCategory: string) {
    this.activeCategory = activeCategory
    this.activeCategoryEvent.emit(activeCategory)
  }
}
