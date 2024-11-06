import { Component } from '@angular/core';
import {CdkDragDrop, CdkDragMove, CdkDropList, DragDropModule, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-swipe',
  standalone: true,
  imports: [DragDropModule],
  templateUrl: './swipe.component.html',
  styleUrl: './swipe.component.scss'
})
export class SwipeComponent {

  recipes: {id: number, title: string, rotation:number}[] = [
    {id: 1, title: "Chili con carne", rotation: 0},
    {id: 2, title: "Spaghetti", rotation: 0},
    {id: 3, title: "Falukorv", rotation: 0}
  ];

  notLiked: {id: number, title: string, rotation:number}[] = [];
  liked: {id: number, title: string, rotation:number}[] = [];

  onDragMove(event: any){

    const distance = event.distance.x;
    const isLiked = (distance > 100);
    const isNotLiked = (distance < -100);
    const index = this.recipes.length - 1; // We always look at the last index 
    this.recipes[index].rotation = Math.round((distance / 100) * 15);
    console.log(this.recipes[index].rotation)

    if(isLiked){
      const [recipe] = this.recipes.splice(index, 1);
      this.liked.push(recipe)
    }else if(isNotLiked){
      const [recipe] = this.recipes.splice(index, 1);
      this.notLiked.push(recipe)
    }
  }

  // onDragMoved(event: CdkDragMove<any>, leftList: CdkDropList, rightList: CdkDropList) {
  //   const currentPosition = event.pointerPosition.x;
  
  //   // Get the bounding boxes of the left and right columns
  //   const leftBounds = leftList.element.nativeElement.getBoundingClientRect();
  //   const rightBounds = rightList.element.nativeElement.getBoundingClientRect();
  
  //   if (currentPosition < leftBounds.right) {
  //     // Move the card to the left list
  //     this.transferCard(event.item.data, this.middleListData, this.leftListData);
  //   } else if (currentPosition > rightBounds.left) {
  //     // Move the card to the right list
  //     this.transferCard(event.item.data, this.middleListData, this.rightListData);
  //   }
  // }
  
  // transferCard(card: any, fromList: any[], toList: any[]) {
  //   // Remove the card from the source list
  //   const index = fromList.indexOf(card);
  //   if (index > -1) {
  //     fromList.splice(index, 1);
  //     toList.push(card);
  //   }
  // }
  

  drop(event: CdkDragDrop<{id: number, title: string}[]>){
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {

    }
  }
}
