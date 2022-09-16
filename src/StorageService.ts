export interface Score {
  score: number;
  date: number;
}
abstract class StorageService {
  public static saveScore(score) {
    const scores = JSON.parse(localStorage.getItem("MindSumoScores") || "[]");
    scores.push({ score: parseInt(score), date: Date.now() });
    localStorage.setItem("MindSumoScores", JSON.stringify(scores));
  }
  public static getHighScores(limit: number): Score[] {
    let scores: Score[] = JSON.parse(
      localStorage.getItem("MindSumoScores") || "[]"
    ).sort((a, b) => b.score - a.score);
    return scores.slice(0, limit);
  }
  public static fill(count) {
    for (let index = 0; index < count; index++) {
      this.saveScore(index);
    }
  }
}
export default StorageService;
