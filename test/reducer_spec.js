import {Map, List,  fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {

    it('handles SET_ENTRIES', () => {
        const initialState = Map()
        const action = {type: 'SET_ENTRIES', entries: ['Marudhanayagam', 'Alavandhan']}
        const nextState = reducer(initialState, action)
        expect(nextState).to.equal(fromJS({
            entries: ['Marudhanayagam', 'Alavandhan']
        }))
    })

    it('handles NEXT', () => {
        const initialState = Map({
            entries: List.of('Jill', 'Jang', 'Juck')
        })
        const action = {type: 'NEXT', }
        const nextState = reducer(initialState, action)
        expect(nextState).to.equal(fromJS({
            vote: {pair: ['Jill', 'Jang']},
            entries: ['Juck']
        }))
    })

    it('handles VOTE', () => {
        const initialState = Map({
            vote: Map({
                pair: List.of('Trainspotting', '28 Days Later')
            }),
            entries: List()
        })
        const action = {type: 'VOTE', entry: 'Trainspotting'}
        const nextState = reducer(initialState, action)
        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Trainspotting', '28 Days Later'],
                tally: {'Trainspotting': 1}
            },
            entries: []
        }))
    })

    it('should handle initial state', () => {
        const action = {type: 'SET_ENTRIES', entries: ['Marudhanayagam', 'Alavandhan']}
        const nextState = reducer(undefined, action)
        expect(nextState).to.equal(fromJS({
            entries: ['Marudhanayagam', 'Alavandhan']
        }))
    })

    it('can be used with reduce', () => {
        const actions = [
            {type: 'SET_ENTRIES', entries: ['Trainspotting', 'Sunshine', '28 days Later', '127 hours']},
            {type: 'NEXT'},
            {type: 'VOTE', entry: 'Trainspotting'},
            {type: 'VOTE', entry: 'Trainspotting'},
            {type: 'VOTE', entry: 'Sunshine'},
            {type: 'NEXT'},
            {type: 'VOTE', entry: '28 days Later'},
            {type: 'VOTE', entry: '28 days Later'},
            {type: 'NEXT'},
            {type: 'VOTE', entry: 'Trainspotting'},
            {type: 'NEXT'}

        ]
        const finalState = actions.reduce(reducer, Map())

        expect(finalState).to.equal(fromJS({
            winner: 'Trainspotting'
        }))
    })

})