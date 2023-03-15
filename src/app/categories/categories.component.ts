import { Component, EventEmitter, Input, Output } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  apiUrl = 'http://localhost:3000/categories'
  categories : any = []
  activeCategory = ''

  @Output() activeCategoryEvent = new EventEmitter<string>();
  @Input() productsCount = 0

  ngOnInit() {
    this.getCategories()
  }

  getCategories() {
    axios.get(this.apiUrl).then(res => {
      this.categories = res.data
    })
  }

  setActiveCategory(activeCategory: string) {
    this.activeCategory = activeCategory
    this.activeCategoryEvent.emit(activeCategory)
  }
}
