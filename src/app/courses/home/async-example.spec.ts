import { fakeAsync, flush, tick } from "@angular/core/testing";


fdescribe('angular testing example',()=>{



  beforeEach(()=>{

  })


it('Async test example with Jasmin done()',(done : DoneFn)=>{
    let test  = false
    setTimeout(() => {
      test = true
      console.log("runing assertion")
      expect(test).toBeTruthy()
      done()
    }, 500);
  })


  it('Async test example -setTimeout()', fakeAsync(( )=>{

    let test  = false

    setTimeout(() => { }, 1000);
    setTimeout(() => {
      test = true
      console.log("runing assertion")


    }, 500);
    // tick tick(500)

flush()

    expect(test).toBeTruthy()
  }))
})
