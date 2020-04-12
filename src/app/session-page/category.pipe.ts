import { Pipe, PipeTransform } from '@angular/core';
import { MessageCategories } from './models/message-categories.enum';
import { Message } from './models/message.model';

@Pipe({
    name: 'categoryFilter',
    pure: false
})
export class CategoryFilterPipe implements PipeTransform {
    transform(items: Message[], filter: MessageCategories): Message[] {
        if (!items || !filter) {
            return items;
        }

        return items.filter(item => item.category === filter);
    }
}