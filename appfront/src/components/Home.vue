<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
<template>
  <div class="home">
    <el-row display="margin-top:1px;">
      <el-input v-model="input" placeholder="请输入书名" style="display:inline-table; width: 50%; float:left"></el-input>
      <el-button type="primary" @click="addBook()" style="float:left; margin: 2px;">新增</el-button>
    </el-row>
    <el-table :data="bookList" style="width: 100%;" :row-class-name="tableRowClassName" border>
      <el-table-column prop="id" label="编号" min-width="100">
        <template scope="scope"> {{ scope.row.pk }}</template>
      </el-table-column>
      <el-table-column prop="book_name" label="书名" min-width="100">
        <template scope="scope"> {{ scope.row.fields.book_name }}</template>
      </el-table-column>
      <el-table-column prop="add_time" label="添加时间" min-width="100">
        <template scope="scope"> {{ scope.row.fields.add_time }}</template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="del(scope.row)" type="button" size="small">查看</el-button>
          <el-button type="button" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>


<script>
  export default {

    name: 'home',
    data() {
      return {
        input: '',
        bookList: []
      }
    },
    mounted: function () {
      this.showBooks()
    },
    methods: {
      tableRowClassName({row, rowIndex}) {
        if (rowIndex % 2 ==0) {
          return 'warning-row';
        } else  {
          return 'success-row';
        }
        return '';
      },
      handleClick(row) {
        console.log(row);
      },
      del() {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      addBook() {
        this.$http.get('http://127.0.0.1:8000/api/add_book?book_name=' + this.input)
          .then((response) => {
            var res = JSON.parse(response.bodyText)
            if (res.error_num === 0) {
              this.showBooks()
            } else {
              this.$message.error('新增书籍失败，请重试')
              console.log(res['msg'])
            }
          })
      },
      showBooks() {
        this.$http.get('http://127.0.0.1:8000/api/show_books')
          .then((response) => {
            var res = JSON.parse(response.bodyText)
            console.log(res)
            if (res.error_num === 0) {
              this.bookList = res['list']
            } else {
              this.$message.error('查询书籍失败')
              console.log(res['msg'])
            }
          })
      },
      delBooks() {
        this.$http.get('http://127.0.0.1:8000/api/del_books')
          .then((response) => {
            var res = JSON.parse(response.bodyText)
            console.log(res)
            if (res.error_num === 0) {
              this.bookList = res['list']
            } else {
              this.$message.error('查询书籍失败')
              console.log(res['msg'])
            }
          })
      }
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>

