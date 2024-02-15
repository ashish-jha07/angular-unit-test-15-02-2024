import { inject } from '@angular/core';
import { CalculatorService } from './calculator.service';
// import { LoggerService } from './logger.service';
import { TestBed } from '@angular/core/testing';import { LoggerService } from './logger.service';

describe('calculatorService', ()=> {
  let calculatorService  : CalculatorService,
      loggerSpy          : any

  beforeEach( ()=> {
    console.log("beforeEach call ")
    loggerSpy = jasmine.createSpyObj('Loggerservice', ['log'])
    TestBed.configureTestingModule({
      providers: [
        CalculatorService,
        {provide: LoggerService, useValue :loggerSpy}
      ]
    })
    calculatorService = TestBed.inject(CalculatorService);
  })



it('should add two numbers', ()=> {
  console.log("add call")
  const result = calculatorService.add(2,2)
  expect(result).toBe(4, "unexpected error to add")
  expect(loggerSpy.log).toHaveBeenCalledTimes(1)
})




it('should subtract two numbers', ()=> {
  console.log("subtract call")
  const result = calculatorService.subtract(2,2)
  expect(result).toBe(0, "unexpected subtract result")
  expect(loggerSpy.log).toHaveBeenCalledTimes(1)
})
})
