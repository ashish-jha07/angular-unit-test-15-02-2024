


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
})
