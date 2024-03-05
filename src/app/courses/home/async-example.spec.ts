import { fakeAsync, flush, flushMicrotasks, tick } from "@angular/core/testing";

import { of } from "rxjs";
import { delay } from "rxjs/operators";


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
    //test

flush()

    expect(test).toBeTruthy()
  }))


// promise have pricidence over settimout
// promise are micro task( have seperation queue)
// click , settime out interval rxjs call all async call added  (event loop)  task queue
  it('Async test example -setTimeout()', fakeAsync(( )=>{

    let test  = false

    setTimeout(() => { }, 1000);
    setTimeout(() => {
      test = true
      console.log("runing assertion")


    }, 500);
    // tick tick(500)
    //test

flush()
Promise.resolve().then(()=>{
  console.log("Promise first then evaluated sucessfuly")
    expect(test).toBeTruthy()
})
  }))



  it('Asynchronous test example - micro task promises', fakeAsync(()=>{
    let test = false
    console.log("Promise created sucessfuly")

    // add in browser task queue
    setTimeout(()=>{
      console.log("setimout 1 first callback trigered ")
    })
    setTimeout(()=>{
      console.log("setimout 2 second callback trigered ")

    })


    // first micro task resolve
    Promise.resolve().then(()=>{
      console.log("Promise first then evaluated sucessfuly")
      test= true;

      return  Promise.resolve()
    }).then(()=>{
      console.log("Promise (second) then evaluated sucessfuly")

    });
    flush() //  2 timer(s) still in the queue. i won't flush settimout then it give error 2 task in quee
    flushMicrotasks()
    console.log("Running test assertion")
    expect(test).toBeTruthy()
  }))






  it('Asynchronous test example -  promises + settimeout', fakeAsync(()=>{
     let counter = 0;
     Promise.resolve().then(()=>{
       counter +=10
       console.log( " i m in promises ")
       setTimeout(() => {
         counter +=1
         console.log( " i m in settimeout")
       },1000);
     })




     expect(counter).toBe(0)
     flushMicrotasks()
     expect(counter).toBe(10)
     tick(500)
     expect(counter).toBe(10)
     tick(500)
     expect(counter).toBe(11)

  }))


  fit('Asynchronous test example - Obserable', fakeAsync( ()=>{
          let test = false ;
          // creating obserable
          console.log(" creating obserable ");
      // Of working as sync obserable
          const test$ = of(test).pipe(delay(1000));

          test$.subscribe(()=> {
            test = true
          })
          tick(1000)
          expect(test).toBeTruthy()
  }))
})



