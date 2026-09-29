# 生成提示词

工具：内置 image_gen。

## 登录页 v1 原始提示词

Use case: ui-mockup. Generate ONE high-fidelity simple desktop login page screenshot for a personal website's private analytics dashboard. This is a minimalist product UI design, not an illustration. Landscape roughly 1536x1024. Entire page visible, straight-on screenshot, no browser frame.

User wants it extremely simple, normal and understated. Solid neutral very light gray #f5f6f8 canvas, pure white top bar, pure white form card, thin gray border, 8px corner radius, almost no shadow. Dark neutral typography and one blue login button #2f6bff. Absolutely no green tinted background, no gradients, no decorative background, no characters, no hero illustration, no large personal logo, no dashboards in background, no side menu.

Top bar 64px high: very small regular-weight lowercase text wordmark 'jiaxuan' at upper left, matching a restrained website navigation text logo. Upper right small text link '返回主站' with a small external/arrow icon. Thin neutral bottom divider.

Centered form card about 400px wide, visually slightly above vertical center with generous whitespace. Internal padding 32px.
Heading '私人数据后台' about 24px semibold, simple left-aligned.
Below muted line '请输入管理员密码'.
Single field only: label '密码', a clean password input with placeholder '请输入密码', and small outline eye icon at right to show/hide the password.
One full-width BLUE button with exact text '登录'.
Under button a very small muted line with tiny lock outline icon '仅限管理员访问'.
No username field, no email, no registration, no third-party login, no CAPTCHA, no remember-me checkbox, no forgot-password link, no marketing copy. Show a default empty neutral form state, no error.
Everything is Chinese except the tiny jiaxuan wordmark. Crisp readable Chinese sans serif. Plain professional interface realistic enough to implement faithfully.

## 统计页 v2 修订摘要

Edit the prior analytics dashboard into a neutral #f5f6f8 canvas, white sidebar/cards and pale blue selections. Keep UV blue and PV green. Replace oversized green JiaXuan with small dark gray lowercase jiaxuan, matching the website reference. Only 数据概览 in navigation; bottom 打开主站 and 退出登录. Preserve all charts, Chinese labels, filters, example data and single-visit duration unit.

## 输出来源

- 统计页：exec-69b2db7c-2c19-4ac9-a547-da8f3ac95f83.png；来自此前统计页和用户网站字标截图的定向修订。
- 登录页：exec-62bd6b9e-319e-4859-b0d6-55f87787279c.png；本轮新生成。

最终文件已复制到本目录；原始生成文件保留。
