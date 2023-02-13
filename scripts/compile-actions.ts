import ActionFactory from "../flows/action-factory";
import fs from 'fs'
import ArgumentFactory from "../flows/argument-factory";

const path = './.homeycompose/flow'

fs.writeFile('./test.json', 'I am cool', (err) => {console.log(err)})

const argFactory = new ArgumentFactory();
const actions = new ActionFactory().getActions()

actions.forEach(action => {
    console.log(action.id)

    const obj = {
        id: action.id,
        title: { "en": action.title },
        titleFormatted: { "en": action.titleFormatted },
        args: argFactory.get(action.args)
    };

    const json = JSON.stringify(obj, (k, v) => v ?? undefined, 2);

    fs.writeFile(`${path}/actions/${action.id}.json`, json, (err) => {console.log(err)})
})
