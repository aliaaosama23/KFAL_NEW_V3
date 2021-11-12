export class  UserModel {
  constructor(
      public CV: String,
      public City_Name: String,
      public Country_Name: String,
      public FK_City_ID: Number,
      public FK_Country_ID: Number,
      public FK_SpecializationChildID: Number,
      public Fk_SpecializationParentID: Number,
      public Gender: String,
      public ISBlocked: boolean,
      public IsJoin: boolean,
      public User_Address: String,
      public User_Age: Number,
      public User_Email: String,
      public User_Full_Name: String,
      public User_Mobile: Number,
      public User_Type: Number
  ){}
}
