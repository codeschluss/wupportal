package de.codeschluss.portal.core.common;

import java.util.Arrays;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.OperationBuilderPlugin;
import springfox.documentation.spi.service.contexts.OperationContext;
import springfox.documentation.swagger.common.SwaggerPluginSupport;

@Component
public class OperationIdBuilder implements OperationBuilderPlugin {

	@Override
	public void apply(OperationContext ctx) {
		String call = StringUtils.capitalize(ctx.getName());
		String tag = Arrays.stream(ctx.getGroupName().split("-"))
				.map(StringUtils::capitalize)
				.collect(Collectors.joining());

		ctx.operationBuilder()
				.codegenMethodNameStem(StringUtils.uncapitalize(tag + call));
	}

	@Override
	public boolean supports(DocumentationType delimiter) {
		return SwaggerPluginSupport.pluginDoesApply(delimiter);
	}

}
