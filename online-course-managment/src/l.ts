postCourseForm: FormGroup;
  token: string = sessionStorage.getItem("token") ?? "";
isEditMode = false;
  constructor(private fb: FormBuilder, private courseService:CoursesService, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const courseData = navigation?.extras.state?.['courseData'];
    this.postCourseForm = this.fb.group({
      course: this.fb.group({
        title: [courseData ? courseData.title : '', Validators.required],
        description: [courseData ? courseData.description : '', Validators.required],
        id: [courseData ? courseData.id : null] 
      })
    });
    if (courseData) {
      this.isEditMode = true; 
    }
  }

  onSubmit(): void {
    const storedUserId = localStorage.getItem('userId');
    const userId: string | null = storedUserId;
  
    if (this.isEditMode) {
      if (this.postCourseForm.valid) {
        console.log(this.postCourseForm.value);
        this.courseService.putCoursr(
          this.postCourseForm.value.course.title,
          this.postCourseForm.value.course.description,
          userId,
          this.token,
          this.postCourseForm.value.course.id
        ).subscribe({
          next: (data) => {
            console.log("הקורס עודכן בהצלחה");
            console.log(data);
            this.router.navigate(['/courses']);  // מעבר אחרי עדכון
          },
          error: (err) => {
            console.log("שגיאה בעדכון הקורס", err);
          }
        });
      }
    } else {
      if (this.postCourseForm.valid) {
        console.log(this.postCourseForm.value);
        this.courseService.postCoursr(
          this.postCourseForm.value.course.title,
          this.postCourseForm.value.course.description,
          userId,
          this.token
        ).subscribe({
          next: (data) => {
            console.log("הקורס נוסף בהצלחה");
            this.router.navigate(['/courses']);  // מעבר אחרי הוספה
          },
          error: (err) => {
            console.log("שגיאה בהוספת הקורס", err);
          }
        });
      }
    }
  }