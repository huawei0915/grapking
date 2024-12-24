import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'numberToAlphabet'
})
export class NumberToAlphabetPipe implements PipeTransform {

    transform(value: string): string {
        const alphabet = 'JABCDEFGHI';
        let result = '';

        for (const char of value) {
            if (char === '.') {
                result += '.';
            } else {
                const num = parseInt(char, 10);
                if (!isNaN(num) && num >= 0 && num <= 9) {
                    result += alphabet[num];
                } else {
                    result += char;
                }
            }
        }

        return result;
    }
}
