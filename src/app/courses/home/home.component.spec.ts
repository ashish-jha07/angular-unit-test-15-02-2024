import {async, ComponentFixture, fakeAsync, flush, flushMicrotasks, TestBed, tick, waitForAsync} from '@angular/core/testing';
import {CoursesModule} from '../courses.module';
import {DebugElement} from '@angular/core';

import {HomeComponent} from './home.component';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {CoursesService} from '../services/courses.service';
import {HttpClient} from '@angular/common/http';
import {COURSES} from '../../../../server/db-data';
import {setupCourses} from '../common/setup-test-data';
import {By} from '@angular/platform-browser';
import {of} from 'rxjs';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {click} from '../common/test-utils';
import SpyObj = jasmine.SpyObj;



fdescribe('HomeComponent', () => {
  // let courseServiceSpy: SpyObj<CoursesService>; // Declare the spy here
  const courseSpy = jasmine.createSpyObj('CoursesService',['findAllCourses'])

  // const coursesServiceSpy = jasmine.createSpyObj('CoursesService', [
  //   'findAllCourses',
  // ]);

  let fixture       : ComponentFixture<HomeComponent>;
  let component     : HomeComponent;
  let el            : DebugElement;
  let coursesService: CoursesService

  const beginnerCourses = setupCourses().filter(course => course.category === 'BEGINNER');
  const advancedCourses = setupCourses().filter(course => course.category === 'ADVANCED');
  // waitForAsync
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports:[CoursesModule,NoopAnimationsModule,],
      providers:[{provide :CoursesService, useValue : courseSpy}]
    }).compileComponents().then(()=>{

      fixture         = TestBed.createComponent(HomeComponent) ;
      component       = fixture.componentInstance ;
      el              = fixture.debugElement ;
      coursesService  = TestBed.inject(CoursesService)
    })
  }));

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });


  it("should display only beginner courses", () => {
    courseSpy.findAllCourses.and.returnValue(of(beginnerCourses));
    fixture.detectChanges()
    const tabs = el.queryAll(By.css(".mdc-tab"))
    expect(tabs.length).toBe(1,"unexpected number of tabs found")
  });


  it("should display only advanced courses", () => {
    courseSpy.findAllCourses.and.returnValue(of(advancedCourses));
    fixture.detectChanges()
    const tabs = el.queryAll(By.css(".mdc-tab"))

    expect(tabs.length).toBe(1,"unexpected number of tabs found")

  });


  it("should display both tabs", () => {
    courseSpy.findAllCourses.and.returnValue(of(setupCourses()));
    fixture.detectChanges()
    const tabs = el.queryAll(By.css(".mdc-tab"))
    expect(tabs.length).toBe(2,"Expected to find two tabs")

  });




  it("should display advanced courses when the 'Advanced' tab is clicked", (done: DoneFn) => {
    courseSpy.findAllCourses.and.returnValue(of(setupCourses()));
    fixture.detectChanges();
    const tabs = el.queryAll(By.css(".mdc-tab"));
    click(tabs[1]); // Assuming 'Advanced' tab is at index 1
    fixture.detectChanges();
    setTimeout(() => {
      const cardTitles = el.queryAll(By.css('.mat-mdc-tab-body-active .mat-mdc-card-title'));
      // console.log('Card Titles after click:', cardTitles.map((title) => title.nativeElement.textContent));
      expect(cardTitles.length).toBeGreaterThan(0, "could not find card title");
      expect(cardTitles[0].nativeElement.textContent).toContain("Angular Security Course - Web Security Fundamentals", "title not contain expected content");
      done();
    }, 1000);
  });




// with fakeasync
  it("should display advanced courses when the 'Advanced' tab is clicked  fakeasync" , fakeAsync(() => {
    courseSpy.findAllCourses.and.returnValue(of(setupCourses()));
    fixture.detectChanges();
    const tabs = el.queryAll(By.css(".mdc-tab"));
    click(tabs[1]); // Assuming 'Advanced' tab is at index 1
    fixture.detectChanges();

    flush() // empty task queue
    // tick(15)

    const cardTitles = el.queryAll(By.css('.mat-mdc-tab-body-active .mat-mdc-card-title'));
    // console.log('Card Titles after click:', cardTitles.map((title) => title.nativeElement.textContent));
    expect(cardTitles.length).toBeGreaterThan(0, "could not find card title");
    expect(cardTitles[0].nativeElement.textContent).toContain("Angular Security Course - Web Security Fundamentals", "title not contain expected content");
    // flush()
    // flushMicrotasks()
    // setTimeout(() => {

    //   // done();
    // }, 1000);
  }));






  fit("should display advanced courses when the 'Advanced' tab is clicked  async" , waitForAsync(() => {
    courseSpy.findAllCourses.and.returnValue(of(setupCourses()));
    fixture.detectChanges();
    const tabs = el.queryAll(By.css(".mdc-tab"));
    click(tabs[1]); // Assuming 'Advanced' tab is at index 1
    fixture.detectChanges();

    // flush() // empty task queue
    // tick(15)
     fixture.whenStable().then(()=>{
      const cardTitles = el.queryAll(By.css('.mat-mdc-tab-body-active .mat-mdc-card-title'));
      // console.log('Card Titles after click:', cardTitles.map((title) => title.nativeElement.textContent));
      expect(cardTitles.length).toBeGreaterThan(0, "could not find card title");
      expect(cardTitles[0].nativeElement.textContent).toContain("Angular Security Course - Web Security Fundamentals", "title not contain expected content");
     })

    // flush()
    // flushMicrotasks()
    // setTimeout(() => {

    //   // done();
    // }, 1000);
  }));
});


