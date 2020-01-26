'use strict';

export const getDate = stringDate => {
    const split = stringDate.split('/');
    return new Date(`01/${split[0]}/${split[1]}`);
};