import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/service/category.service';
@Component({
  selector: 'app-service-input',
  templateUrl: './service-input.component.html',
  styleUrls: ['./service-input.component.css']
})
export class ServiceInputComponent implements OnInit {
  heading: string = '';
  paragraph: string = '';
  overview_items: Array<{ imageUrl: string, title: string, description: string }> = [
    { imageUrl: '', title: '', description: '' }
  ];
  experts: string = '';
  tools_images: string[] = ['', '', '', ''];
  procedureDays = [
    {
      title: '',
      description: [{
        heading: '',
        description: ''
      }],
      images: ''
    }
  ];
  whoAttends = {
    heading: '',
    subPoints: ['']
  };
  certificate:any=''
  categoryList: any = [];
  categoryId: any;
  servicesList: any = [];
  masterServicesId: any;

  isToolsContentVisible = false;
  isToolsCourseVisible = false;
  isWhoAttendsVisible = false;
  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.GetAcademyCategory()
  }

  toggleToolsContent() {
    this.isToolsContentVisible = !this.isToolsContentVisible; 
  }
  toggleCourseStructure() {
    this.isToolsCourseVisible = !this.isToolsCourseVisible; 
  }
  toggleWhoAttendsContent() {
    this.isWhoAttendsVisible = !this.isWhoAttendsVisible; 
  }
  GetAcademyCategory() {
    this.categoryService.GetAcademyCategory().subscribe((response: any) => {
      this.categoryList = response
      this.categoryId = response[0].id;
    });
  }

  GetAcademyServicesList() {
    this.categoryService.GetCourseModalData(this.categoryId).subscribe((response) => {
      this.servicesList = response
    });
  }

  onCategoryChange() {
    this.GetAcademyServicesList();
  }

  addItem() {
    if (this.overview_items.length < 4) {
      this.overview_items.push({ imageUrl: '', title: '', description: '' });
    } else {
      alert('You can only add up to 4 items.');
    }
  }

  removeItem(index: number) {
    if (this.overview_items.length > 1) {
      this.overview_items.splice(index, 1);
    }
  }

  addProcedureDay(): void {
    this.procedureDays.push({
      title: '',
      description: [{
        heading: '',
        description: ''
      }],
      images: ''
    });
  }

  addPoint(index: number): void {
    this.procedureDays[index].description.push({
      heading: '',
      description: ''
    });
  }

  addSubPoint(): void {
    this.whoAttends.subPoints.push('');
  }

  updateContent() {
    const updatedCourseOverview = `<h3 class="ff-gotham-bold font-11 text-uppercase">${this.heading}</h3><p class="font-sub-color font-10">${this.paragraph}</p>`

    let updatedOverviewImages = '';
    if (this.overview_items.length <= 0) {
      this.overview_items.forEach(overview_items => {
        updatedOverviewImages += `
        <div class="col-md-6 col-6 py-3">
          <img
            src="${overview_items.imageUrl}"
            alt=""
            class="img-fluid mx-auto d-block border-radius-10 elavate-img-main"
          />
          <h5 class="ff-gotham-book font-12 mb-0 mt-2">${overview_items.title}</h5>
          <p class="ff-gotham-light font-10 font-sub-color mb-0">
            ${overview_items.description}
          </p>
        </div>`;
      });
    }

    const updatedExpertsBanner = `<div class="row">
    <div class="col-12">
      <img src="${this.experts}" alt="" class="d-block mx-auto img-fluid" />
    </div>
  </div>`
    let updatedToolsImages = ''
    if (this.tools_images.length <= 0) {
      updatedToolsImages = '<div class="row"><div class="col-12"><h4 class="font-18 mt-5 ff-gotham-bold text-uppercase"> Tools and Equipment by MIA:</h4></div>'
      this.tools_images.forEach(img => {
        updatedToolsImages += `
                <div class="col-md-6 pb-3">
                  <img
                    src="${img}"
                    alt="" class="img-fluid mx-auto d-block border-radius-10 elavate-img-main" />
                </div>`
      })
      updatedToolsImages += '</div>'
    }

    let updatedCourseStructure = ''
    if (this.procedureDays.length > 0) {
      updatedCourseStructure += `
        <div class="dv_page_details_points_ul_head">
          <h3 class="font-18 ff-gotham-bold text-uppercase mt-5">Course Structure</h3>
          <ul class="dv_page_details_points bulletnumber">
            <div class="dv_per_day_procedure">
              <ul class="dv_page_details_points bulletnumber">`;

      this.procedureDays.forEach(data => {
        updatedCourseStructure += `
          <li>
            <div class="modal-sub-each">
              <span class="py-2 font-18 text-uppercase ff-gotham-bold">${data.title}</span>
              <div class="image-container sub-points">
                <ul>`;

        data.description.forEach(points => {
          updatedCourseStructure += `
                  <li>
                    <span>${points.heading}</span>${points.description}
                  </li>`;
        });
        updatedCourseStructure += `</ul> `
        let img = data.images.split(',')
        if (img.length > 0) {
          updatedCourseStructure += ` <div class="slider">`
          img.forEach(img => {
            updatedCourseStructure += `      
          <div class="item">
            <img src="${img}" class="img-fluid position-relative" alt="" />
          </div>`;
          })
          updatedCourseStructure += `</div>`
        }

        updatedCourseStructure += `
              </div>
            </div>
          </li>`

      })
      updatedCourseStructure += `
      </ul>
      </div>
      </ul>
      </div>`;
    }

    let updatedWhoCanAttendCourse = ''
    if (this.whoAttends.subPoints.length > 0) {
      updatedWhoCanAttendCourse += `<h5 class="font-16 ff-gotham-bold text-uppercase pt-3">
                                   ${this.whoAttends.heading}
                                    </h5>
                                    <ul class="dv_sub_service_descrition_ul ul-2">`
      this.whoAttends.subPoints.forEach(data => {
        updatedWhoCanAttendCourse += `<li>${data}</li>`
      })

      updatedWhoCanAttendCourse += `</ul>`
    }

    let updatedCertificateImages =''
    let certificate =this.certificate.split(',')
    if (certificate.length > 0) {
      updatedCertificateImages += `<div class="col-md-4">
    <img src="${certificate[0]}" alt="" class="img-fluid" />
    </div>
    <div class="col-md-8">
    <img src="${certificate[1]}" alt="" class="img-fluid" />
    </div>`
    }

    let model = {
      categoryId: this.categoryId,
      masterServicesId: this.masterServicesId,
      updatedToolsImages,
      updatedExpertsBanner,
      updatedOverviewImages,
      updatedCourseOverview,
      updatedCourseStructure,
      updatedWhoCanAttendCourse
    }
    this.categoryService.setAcademyContentAdmin(model);
  }
}
