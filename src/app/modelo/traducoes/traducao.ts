import { Translation } from "primeng/api";

export class Traducao {
    public translation: Translation = {
        startsWith: 'Inicia com',
        contains: 'Contém',
        notContains: 'Não Contém',
        endsWith: 'Termina com',
        equals: 'Egual',
        notEquals: 'Não Egual',
        // noFilter: 'No Filter',
        lt: 'Menor que',
        lte: 'Menor que ou igual a',
        gt: 'Maior que',
        gte: 'Maior que ou igual a',
        is: 'É',
        isNot: 'Não é',
        before: 'Antes',
        after: 'Depois',
        clear: 'Limpar',
        apply: 'Aplicar',
        matchAll: 'Combinar tudo',
        matchAny: 'Corresponder a qualquer',
        addRule: 'Adicionar regra',
        removeRule: 'Remover regra',
        accept: 'Sim',
        reject: 'Não',
        choose: 'Escolher',
        upload: 'Upload',
        cancel: 'Cancelar',
        dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        dayNamesMin: ["Su","Mo","Tu","We","Th","Fr","Sa"],
        monthNames: ["January","February","March","April","May","June","July","August","September","October","November","December"],
        monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        today: 'Today',
        weekHeader: 'Wk'
    }
    
}