# markdown-extension

::: v-pre
**Input:** `{{ 'JAVAScRiPT'.toLowerCase() }}`
:::

**Output:** {{ 'JAVAScRiPT'.toLowerCase() }}

---

::: v-pre
**Input:** `<span v-for="i in 3">{{ i }} </span>`
:::

**Output:** <span v-for="i in 3">{{ i }} </span>

---

::: v-pre
**Input:** `{{ $page }}`
:::

**Output:** {{ $page }}

---

::: v-pre
**Input:** `### Badge <Badge text="beta" type="warn"/> <Badge text="0.10.1+"/>`
:::

**Output:**

### Badge <Badge text="beta" type="warn"/> <Badge text="0.10.1+"/>
