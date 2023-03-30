import dotenv from 'dotenv';
dotenv.config();

import Enum from 'enum';

export default {
    routeEnum:() => {
        const routeEnum = new Enum(['Users'], { ignoreCase: true });
        return routeEnum;
    },

    getPlaceholderStringForArray: (arr) => {
        if (!Array.isArray(arr)) {
            throw new Error('Invalid input');
        }

        // if is array, we'll clone the arr 
        // and fill the new array with placeholders
        const placeholders = [...arr];
        return placeholders.fill('?').join(', ').trim();
    },

    multipleColumnSet: (object) => {
        if (typeof object !== 'object') {
            throw new Error('Invalid input');
        }

        const keys = Object.keys(object);
        const values = Object.values(object);

        let columnSet = keys.map(key => `${key} = ?`).join(', ');
        return {
            columnSet,
            values
        }
    },

    multipleSearchColumnSet: (object) => {
        if (typeof object !== 'object') {
            throw new Error('Invalid input');
        }

        const keys = Object.keys(object);
        const values = Object.values(object);

        let columnSet = keys.map(key => `${key} = ?`).join(' AND ');
        return {
            columnSet,
            values
        }
    },

    multipleSearchORColumnSet: (object) => {
        if (typeof object !== 'object') {
            throw new Error('Invalid input');
        }

        const keys = Object.keys(object);
        const values = Object.values(object);

        let columnSet = keys.map(key => `${key} LIKE ?`).join(' OR ');
        return {
            columnSet,
            values
        }
    }
}