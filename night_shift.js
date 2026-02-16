// "NIGHT SHIFT"
// "NIGHT SHIFT" @by Eva Dai

setCps(140/60/4)

const dbank = "tr909"
const sound_cutoff = 600
const piano_cutoff = 2400
const air_cutoff   = 1400
const bass_cutoff  = 800

$: s("saw")
  .note("c6")
  .lpf("<3000, 4000, 5000, 6000>")
  .chop(160) // granularization as if flapping wing
  // Amplitude modulation
  .gain(
    sine.range(0.01, 0.07).segment(60)
      .mul(
          "<0.05 0.12 0.25 0.3 0.22 0.12 0.06 0.03>"
        .slow(4)
      )
  )
  .room(0.35)
  .slow(2)

  // tick
$: s("rim").struct("x ~ x ~")
    .hpf(4500)
    .gain(0.025)
    .decay(0.03)
.room(0.5)

  // tock
$: s("rim").struct("~ x ~ x")
    .lpf(1400)
    .gain(0.1)
    .decay(0.05)
.room(0.5)


$: note("<~ 84@3 ~ 86@3 84@3 ~ 88@3 ~>")
  .s("sine")
  .lpf(3500)
  .gain("<0 0.08 0 0.09 0.07 0 0.1 0>")
  .adsr("0.01:0.06:0.2:0.08")
  .delay("<0 .25 0 .5>")
  .delaytime(.125)
  .room(1.8)

$: s("gm_harmonica")
  .struct("<~@2 x ~>")
  .chop(16)
  .lpf(chooseCycles("600", "1000", "2000", "3000"))
  .lpa(1)
  .delay("<0 .125 .25 0>")
  .delaytime("<.125 .25>")
  .room(5)
  .gain(sine.range(0.3, 0.8))
  .adsr("1.5:1.5:2:1.5")

$: s("wind")
  .struct("<~@3 x?>")
  .cutoff(air_cutoff)
  .gain(chooseCycles("0.4", "0.6", "0.8", "1"))
  .adsr("1.5:1.5:2:<2 5 10>")
  .chop(20)
  .room(3)

$: note("[69, 65] [67, 64, 61] 62 67.5@2 ~ [64, 60]@2")
  .s("piano")
  .lpf(piano_cutoff)
  .gain("<0.01 0.005 0.002 0.001>")
  .room(3)
  .delay("<0 .25 .5 0>")
  .delaytime(.25)


$: note("[59, 55] [57, 54, 51] 52 57.5@2 ~ [54, 50]@2 [69, 65] [67, 64, 61] 62 67.5@2 ~ [64, 60]@2?")
  .slow(2)
  .clip(saw.slow(2))
  .gain("<0.8 0.9 1 1.2>")
  .sustain("<.25 .5 1 2>/2")
  // .lpf(300)
  .cutoff(bass_cutoff)
  .lpa(0.55)
  .lpenv("<3 2 1 0>")
  .superimpose(x => x.detune("<-0.25 -0.12 0.12 0.25>/2"))
  .sometimesBy(0.12, x => x.ply("<2 4>"))

 
$: s("white@4? ~@12")
  .decay(2)
  .cutoff(sound_cutoff)
  .gain("<0.6 0.4 0.25 0.15>")
  .adsr(".01:.3:1:.2")
  .chop(20)
  .room(.5)

$: note("Bb3,D4".superimpose(x=>x.add(1)))
  .s('rim')
  .cutoff(800) // pitch at 1000 Hz
    //    "<~@3 [~ x]>" is a beat patther    
    //    - < ... >: sequence
    //    - ~: rest
    //    - x: sound
    //    - @3: delay the event to a sub-position
    //    - [~ x]: subdivition
  .struct("<~@3 [~ x]>")
  .decay(.05)
  .gain(1.3)
  .sustain(1)
  .delay(1) // add delay / echo mixture
  .delaytime(.125) // echo space 0.1255
  .room(3)