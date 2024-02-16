<script setup lang="ts">
import { ref } from "vue";
import { ElMessage } from "element-plus";
import type { FormRules, FormInstance } from "element-plus";

// 伪造下拉选择框数据
const selectOptions = Array.from({ length: 20 }).map((_, index) => ({
  label: index,
  value: index,
}));
// 默认单条数据数据
const INITIAL_ITEM = {
  field1: undefined,
  field2: undefined,
  field3: undefined,
  field4: undefined,
  field5: undefined,
  field6: undefined,
};

// 表单引用
const formRef = ref<FormInstance>();
// 表单数据类型
interface FormModel {
  data: {
    field1: number | undefined;
    field2: number | undefined;
    field3: number | undefined;
    field4: number | undefined;
    field5: number | undefined;
    field6: string | undefined;
  }[];
}
// 伪造表单数据
const formModel = ref<FormModel>({
  data: Array.from({ length: 200 }).map((_, index) => ({
    field1: index % 20,
    field2: index % 20,
    field3: index % 20,
    field4: index % 20,
    field5: index % 20,
    field6: "Lorem",
  })),
});
// 表单规则
const formRules: FormRules = {
  select: {
    required: true,
    message: "Please select",
    trigger: "change",
  },
  input: {
    required: true,
    message: "Please input",
    trigger: "change",
  },
};

// 新增一条数据
const handleAdd = () => {
  formModel.value.data.unshift({ ...INITIAL_ITEM });
};

// 校验
const handleValidate = async () => {
  if (!formRef.value) return false;
  return await formRef.value.validate().catch(() => false);
};
// 提交
const handleSubmit = async () => {
  const isValid = await handleValidate();
  if (!isValid) return ElMessage.error("Invalid");
  ElMessage.success("Valid");
  // 略过实际提交逻辑
};
</script>

<template>
  <el-form ref="formRef" :model="formModel">
    <!-- 操作 -->
    <el-form-item>
      <el-col style="text-align: right">
        <el-space>
          <el-button @click="handleAdd">新增一行</el-button>
          <el-button type="primary" @click="handleSubmit">提交</el-button>
        </el-space>
      </el-col>
    </el-form-item>
    <!-- 表格 -->
    <vxe-table
      max-height="512px"
      :scroll-y="{ enabled: true, gt: 0, scrollToTopOnChange: true }"
      :row-config="{ isHover: true, height: 72 }"
      :column-config="{ isHover: true }"
      :show-overflow="false"
      :data="formModel.data"
    >
      <!-- 循环渲染，简化例子 -->
      <vxe-column min-width="128px" v-for="n of 6" :key="n">
        <!-- 提示必填 -->
        <template #header>
          Field{{ n }} <span style="color: red">*</span>
        </template>
        <template #default="{ row, rowIndex }">
          <!-- 渲染 5 个 select -->
          <el-form-item
            v-if="n !== 6"
            :prop="`data.${rowIndex}.field${n}`"
            :rules="formRules.select"
          >
            <el-select v-model="row[`field${n}`]" filterable>
              <el-option
                v-for="option of selectOptions"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- 渲染 1 个 input -->
          <el-form-item
            v-else
            :prop="`data.${rowIndex}.field${n}`"
            :rules="formRules.input"
          >
            <el-input v-model="row[`field${n}`]" clearable></el-input>
          </el-form-item>
        </template>
      </vxe-column>
    </vxe-table>
  </el-form>
</template>
