import { SQLite } from 'expo';
import { Platform } from 'react-native';


class DB {
  constructor(sqliteModule=SQLite, name='db.db') {
    if (!DB._instance) {
      console.log(`Opening Database for ${Platform.OS}, ${sqliteModule}, ${name}`);
      // https://github.com/andpor/react-native-sqlite-storage/issues/184
      this.conn = sqliteModule.openDatabase(name);
      this.conn.transaction((tx)=>{
        tx.executeSql("SELECT SQLITE_VERSION() AS version", [], 
          (_, rs) => {
              console.log('Got version result: ' + rs.rows.item(0).version);
          },
          (_, error) => {
          console.log('db test error:', error)
        });
      }, this.errorCB, this.successCB);
      DB._instance = this;
    }
    return DB._instance
  }

  errorCB(err) {
    console.log("SQL Error: " + err);
    throw new Error(`DB transaction error ${err}`);
  }

  successCB() {
    console.log("SQL executed fine");
  }

  query(q,params=[],cb,eb){
    this.conn.transaction(
      (tx)=>{
        tx.executeSql(q,params,cb,eb)
      },
      this.errorCB,
      this.successCB,
      )
  }

  batchQuery(qs=[],cb,eb){
    this.conn.transaction((tx)=>{
      qs.forEach((q,i)=>{
        tx.executeSql(q.query,q.params,cb,eb)
      })
      },
      this.errorCB, 
      this.successCB,
    )
  }

  reset(cb=(_,rs)=>{}, eb=(_,err)=>{}){
    let queries = [
      {query:'DROP TABLE IF EXISTS search'},
          // use fts4 for now due to bug with android
      {query: 'CREATE VIRTUAL TABLE IF NOT EXISTS search using FTS4(name, text, tokenize=porter)'},
    ]
    this.batchQuery(queries,cb,eb)
  }

  populate(cb=(_,rs)=>{}, eb=(_,err)=>{}){
      let queries = [
        {query: "INSERT INTO search(name, text) VALUES(?, ?)", params: ['aname', 'a database is a software system']},
        {query: "INSERT INTO search(name, text) VALUES(?, ?)", params: ['bname', 'sqlite is a software system']},
        {query: "INSERT INTO search(name, text) VALUES(?, ?)", params: ['cname', 'sqlite is a database']},
      ]
      this.batchQuery(queries,cb,eb)
  }

}

export default DB