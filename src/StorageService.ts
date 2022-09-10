
abstract class StorageService{
  public static saveScore(score){
    const scores = JSON.parse(localStorage.getItem('MindSumoScores') || '[]');
    scores.push({score:score,date:Date.now()})
    localStorage.setItem('MindSumoScores',JSON.stringify(scores));
  }
  public static getScores(){
    return JSON.parse(localStorage.getItem('MindSumoScores') || '') || [];
  }
}
export default StorageService