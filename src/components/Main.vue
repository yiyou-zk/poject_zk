<template>
    
<div>
<el-row :gutter="20">
  <el-col :span="6"><div class="grid-content bg-purple">    
      <label for="">厂区：</label>
      <el-select v-model="value" filterable placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</div></el-col>
  <el-col :span="10" :offset="6"><div class="grid-content bg-purple">

  <div class="block">
    <span class="demonstration">时间：</span>
    <el-date-picker
      v-model="value2"
      type="datetimerange"
      :picker-options="pickerOptions"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      align="right">
    </el-date-picker>
  </div>
      </div></el-col>
</el-row>
<el-row :gutter="20">
  <el-col :span="6" :offset="0"><div class="grid-content bg-purple">
 <span >EqpID：</span>
    <el-select v-model="valueO" filterable placeholder="请选择">
    <el-option
      v-for="item in options2"
      :key="item.valueO"
      :label="item.labelO"
      :value="item.valueO">
    </el-option>
  </el-select>
      </div></el-col>
  <el-col :span="8" :offset="6"><div class="grid-content bg-purple">
       <span class="demonstration">AlarmCode</span>
    <el-select v-model="valueA" filterable placeholder="请选择">
    <el-option
      v-for="item in options3"
      :key="item.valueA"
      :label="item.labelA"
      :value="item.valueA">
    </el-option>
  </el-select>

      </div></el-col>
</el-row>
<el-row :gutter="20">
  <el-col :span="4" :offset="10"><div class="grid-content bg-purple">
      <el-button type="primary" icon="el-icon-search">搜索</el-button>
      </div></el-col>
</el-row> 
<el-row :gutter="20">
  <el-col style="width: 100%"  :offset="0"><div class="grid-content bg-purple">
  
      </div></el-col>
</el-row>  
      <el-table
    :data="tableData"
    height="800"
    border
    style="width: 100%">
    <el-table-column
      prop="date"
      label="厂处"
      width="80">
    </el-table-column>
    <el-table-column
      prop="name"
      label="Line ID"
      width="100">
    </el-table-column>
    <el-table-column
      prop="province"
      label="EQ ID"
      width="100">
    </el-table-column>
    <el-table-column
      prop="city"
      label="start time"
      width="120">
    </el-table-column>
    <el-table-column
      prop="address"
      label="alram code"
      width="150">
    </el-table-column>
     <el-table-column
      prop="zip"
      label="alarm message"
      width="150">
    </el-table-column>
    <el-table-column
      prop="zip"
      label="End Time"
      width="120">
    </el-table-column>
      <el-table-column
      prop="zip"
      label="Down Time"
      width="120">
    </el-table-column>
      <el-table-column
      prop="zip"
      label="Trouble shooting"
      width="120">
    </el-table-column>
          <el-table-column width="100px" label="Title">
        <template slot-scope="{row}">
          <template v-if="row.edit">
            <el-input v-model="row.title" class="edit-input" size="small" />
            <el-button
              class="cancel-btn"
              size="small"
              icon="el-icon-refresh"
              type="warning"
              @click="cancelEdit(row)"
            >
              cancel
            </el-button>
          </template>
          <span v-else>{{ row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Actions" width="120">
        <template slot-scope="{row}">
          <el-button
            v-if="row.edit"
            type="success"
            size="small"
            icon="el-icon-circle-check-outline"
            @click="confirmEdit(row)"
          >
            Ok
          </el-button>
          <el-button
            v-else
            type="primary"
            size="small"
            icon="el-icon-edit"
            @click="row.edit=!row.edit"
          >
            Edit
          </el-button>
        </template>
      </el-table-column>

    
      <el-table-column
      prop="zip"
      label="delete"
      width="60">
             <template slot-scope="scope">
        <el-button
          @click.native.prevent="deleteRow(scope.$index, tableData)"
          type="danger"
          size="small">
          移除
        </el-button>
      </template>

    </el-table-column>

  </el-table>

</div>
   
</template>

<script>
export default {
    name:"Main",
    methods:{
    deleteRow(index, rows) {
        rows.splice(index, 1)
        },
    cancelEdit(row) {
      row.title = row.originalTitle
      row.edit = false
      this.$message({
        message: 'The title has been restored to the original value',
        type: 'warning'
      })
    },
    confirmEdit(row) {
      row.edit = false
      row.originalTitle = row.title
      this.$message({
        message: 'The title has been edited',
        type: 'success'
      })}}
    ,
     data() {
      return {list: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10
      },
        options: [{
          value: '选项1',
          label: 'Array'
        }, {
          value: '选项2',
          label: 'CF'
        }, {
          value: '选项3',
          label: 'CELL'
        }, {
          value: '选项4',
          label: 'ALL'
        }],
        value: '',
        //_______________________________________________
                pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
        value2: '',
        //____________________________________________________
         options2: [{
          valueO: '选项1',
          labelO: '黄金糕'
        }, {
          valueO: '选项2',
          labelO: '双皮奶'
        }, {
          valueO: '选项3',
          labelO: '蚵仔煎'
        }, {
          valueO: '选项4',
          labelO: '龙须面'
        }, {
          valueO: '选项5',
          labelO: '北京烤鸭'
        }],
        valueO: '',
                //____________________________________________________
         options3: [{
          valueA: '选项1',
          labelA: '黄金糕'
        }, {
          valueA: '选项2',
          labelA: '双皮奶'
        }, {
          valueA: '选项3',
          labelA: '蚵仔煎'
        }, {
          valueA: '选项4',
          labelA: '龙须面'
        }, {
          valueA: '选项5',
          labelA: '北京烤鸭2'
        }],
        valueA: '',
        //________________________________________
    tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1517 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1519 弄',
          zip: 200333
        }, {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1516 弄',
          zip: 200333
        }]

      }
    }
    
}

</script>
<style lang="scss">
.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #ffffff;
  }
  .bg-purple {
    background: #ffffff;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .edit-input {
    width: 100px;
  padding-right: 10px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>