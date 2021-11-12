export class CustomConfigrations{
    Base_Url:string='';

    // link to any file :https://kfal.careofme.net/Images/Artboard%20%E2%80%93%2036.png
    constructor(){
        // cloud :https://kfal.careofme.net/TranslationAppAPI/
        // local :"http://192.168.1.160:8899/TranslationAppAPI/"
        this.Base_Url="http://192.168.1.160:8899/TranslationAppAPI/"
    }
}