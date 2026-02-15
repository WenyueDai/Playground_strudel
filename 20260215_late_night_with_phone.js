// DATE: 20260215
// LATE NIGHT WITH PHONE
// CREATED BY EVA DAI

setCps(140/60/4)

const dbank = "tr909"
const sound_cutoff = 600
const piano_cutoff = 2400
const air_cutoff   = 1400
const bass_cutoff  = 700

// mimic Horn / Whistle / Siren
// Random horn personality per cycle
$: s("gm_harmonica")
  .struct("<~@2 x ~>")
  .chop(16)
  .lpf(air_cutoff)
  .lpa(0.45)
  .lpenv(wchoose([
  "<4 3 2 1 0>",
  "<0 5 3 -1 0 -1>"
  ]).slow(2))

  .delay("<0 .125 .25 0>")
  .delaytime("<.125 .25>")
  .room(5)
  .gain(sine.range(0.1, 1))
  .adsr("1.5:1.5:2:1.5")

$: s("wind")
  .struct("<~@3 x>")
  .lpf(air_cutoff)
  .delay("<0 .125 .25 0>")
  .delaytime("<.125 .25>")
  .adsr("3:1.5:2:1.5")
  .gain(sine.range(0.4, 1))

$: note("<~ 84@3 ~ 86@3 84@3 ~ 88@3 ~>")
  .s("sine")
  .lpf(3500)
  .gain("<0 0.08 0 0.09 0.07 0 0.1 0>")
  .adsr("0.01:0.06:0.2:0.08")
  .delay("<0 .25 0 .5>")
  .delaytime(.125)
  .room(1.8)


$: note("<{{69, 65} {67, 64, 61} 62 67.5@2 ~ {64, 60}@3} ~>")
  .s("piano")
  .lpf(piano_cutoff)
  .gain("<0.05 0.03 0.01 0>")
  .room(1.2)
  .delay("<0 0 .25 0>")
  .delaytime(.25)


$: note("{59, 55} {57, 54, 51} 52 57.5@2 ~ {54, 50}@3 {69, 65} {67, 64, 61} 62 67.5@2? ~ {64, 60}@3?")
  .slow(2)
  .clip(saw.slow(2))
  .gain("<0.35 0.5 0.7 1.1>")
  .sustain("<.25 .5 1 2>/2")
  .lpf(300)
  .cutoff(bass_cutoff)
  .lpa(0.55)
  .lpenv("<3 2 1 0>")
  .superimpose(x => x.detune("<-0.25 -0.12 0.12 0.25>/2"))
  .sometimesBy(0.12, x => x.ply("<2 4>"))

$: note("59 ~ 59 ~")
  .s("sine")
  .lpf(200)
  .gain(0.22)
  .adsr("0.01:0.1:0.3:0.1")

$: s("white@4? ~@12")
  .cutoff(sound_cutoff)
  .gain("<0.9 0.65 0.45 0.2>")
  .adsr(".01:.25:1:.18")
  .chop(24)
  .room(0.7)
  .delay("<0 .25 0 .5>")
  .delaytime(.125)

$: s("bd(1,16,0):2")
  .bank(dbank)
  .gain("<0.22 0.28 0.22 0.3>")
  .sometimesBy(0.25, x => x.speed(1.05))
  .lpf(2000)
  .room(0.1)
  .every(4, x => x.ply(2))   

$: s("ch*8")
  .bank(dbank)
  .gain("<0 .06 0 .08 0 .1 0 .06>")
  .lpf(6000)
  .room(0.4)
  .sometimesBy(0.25, x => x.ply(2))
  .every(8, x => x.struct("<x*16>"))

$: note("Bb3,D4".superimpose(x => x.add(.2)))
  .s("rim")
  .cutoff(900)
  .struct("<~@3 [~ x]>")
  .decay(.03)
  .gain(0.9)
  .sustain(0.5)
  .delay(0.9)
  .delaytime(.125)
  .room(2.6)
