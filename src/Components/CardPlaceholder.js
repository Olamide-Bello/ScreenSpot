import React from 'react'
import { Placeholder } from 'react-bootstrap'


// to generate animated card placeholder
const CardPlaceholder = () => {
  return (
    <div className='placeholder-card'>
        <Placeholder as='div' size='lg' animation='glow'>
            <Placeholder className='poster-placeholder' xs={12} />
        </Placeholder>
        <Placeholder as='div' size='lg' animation='glow'>
            <Placeholder  xs={4} />
        </Placeholder>
        <Placeholder as='div' size='lg' animation='glow'>
            <Placeholder  xs={6} />
        </Placeholder>
        <Placeholder as='div' className='flex-placeholder' size='lg' animation='glow'>
            <Placeholder  xs={4} /> <Placeholder  xs={3} /> 
        </Placeholder>
        <Placeholder as='div' size='lg' animation='glow'>
            <Placeholder  xs={8} />
        </Placeholder>
        
    </div>
  )
}

export default CardPlaceholder