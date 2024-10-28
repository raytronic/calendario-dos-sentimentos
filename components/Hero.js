import { Fugaz_One } from 'next/font/google'
import Calendar from './Calendar'
import CallToAction from './CallToAction'

const fugaz = Fugaz_One({ subsets: ['latin'], weight: '400' })

export default function Hero() {
  return (
    <div className='py-4 md:py12 lg-gap-4 gap-8'>
        <h1 className={fugaz.className +' fugaz lg:text-5xl md:text-6xl sm:text-7xl text-center'}>O <span className='textGradient'>calendario de sentimentos </span>
        ajuda a registar os teus sentimentos ao longo do <span className='textGradient'> ano!</span>

        <CallToAction></CallToAction>

        <Calendar demo/>
         
         </h1>
        </div>
  )
}
